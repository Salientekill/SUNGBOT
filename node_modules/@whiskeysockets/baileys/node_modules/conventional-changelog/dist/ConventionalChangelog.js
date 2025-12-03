import fs from 'fs/promises';
import { Readable } from 'stream';
import { ConventionalGitClient, packagePrefix } from '@conventional-changelog/git-client';
import { transformCommit, formatDate, writeChangelog } from 'conventional-changelog-writer';
import { createPresetLoader, loadPreset as defaultLoadPreset } from 'conventional-changelog-preset-loader';
import normalizePackageData from 'normalize-package-data';
import { findPackage } from 'fd-package-json';
import { parseHostedGitUrl } from './hostedGitInfo.js';
import { getHostOptions, guessNextTag, isUnreleasedVersion, versionTagRegex, defaultCommitTransform, bindLogNamespace } from './utils.js';
export { packagePrefix };
/**
 * Conventional changelog generator
 */
export class ConventionalChangelog {
    gitClient;
    params;
    constructor(cwdOrGitClient = process.cwd()) {
        this.gitClient = typeof cwdOrGitClient === 'string'
            ? new ConventionalGitClient(cwdOrGitClient)
            : cwdOrGitClient;
        this.params = Promise.resolve({
            options: {
                append: false,
                releaseCount: 1,
                formatDate,
                transformCommit: defaultCommitTransform
            },
            commits: {
                format: '%B%n-hash-%n%H%n-gitTags-%n%d%n-committerDate-%n%ci',
                merges: false
            }
        });
    }
    composeParams(params) {
        this.params = Promise.all([params, this.params]).then(([params, prevParams]) => ({
            options: {
                ...prevParams.options,
                ...params.options
            },
            context: {
                ...prevParams.context,
                ...params.context
            },
            tags: {
                ...prevParams.tags,
                ...params.tags
            },
            commits: {
                ...prevParams.commits,
                ...params.commits
            },
            parser: {
                ...prevParams.parser,
                ...params.parser
            },
            writer: {
                ...prevParams.writer,
                ...params.writer
            },
            repository: {
                ...prevParams.repository,
                ...params.repository
            },
            package: prevParams.package || params.package
        }));
    }
    async finalizeContext(semverTags, hostOptions) {
        const { options, package: pkg, repository, context } = await this.params;
        const finalContext = {
            packageData: pkg,
            version: pkg?.version,
            gitSemverTags: semverTags,
            ...context
        };
        if (repository) {
            finalContext.repoUrl = finalContext.repoUrl || repository.url;
            finalContext.host = finalContext.host || repository.host;
            finalContext.owner = finalContext.owner || repository.owner;
            finalContext.repository = finalContext.repository || repository.project;
        }
        if (hostOptions) {
            finalContext.issue = finalContext.issue || hostOptions.issue;
            finalContext.commit = finalContext.commit || hostOptions.commit;
        }
        if (isUnreleasedVersion(semverTags, finalContext.version) && options.outputUnreleased) {
            finalContext.version = 'Unreleased';
        }
        return finalContext;
    }
    async finalizeWriterOptions(semverTags, version) {
        const { options, tags, writer } = await this.params;
        let doFlush = options.outputUnreleased;
        if (isUnreleasedVersion(semverTags, version) && !doFlush) {
            doFlush = false;
        }
        else if (typeof doFlush !== 'boolean') {
            doFlush = true;
        }
        const finalOptions = {
            finalizeContext(context, _writerOpts, _filteredCommits, keyCommit, originalCommits) {
                const [firstCommit] = originalCommits;
                const lastCommit = originalCommits[originalCommits.length - 1];
                const firstCommitHash = firstCommit ? firstCommit.hash : null;
                const lastCommitHash = lastCommit ? lastCommit.hash : null;
                if ((!context.currentTag || !context.previousTag) && keyCommit) {
                    const matches = keyCommit.gitTags?.match(versionTagRegex);
                    const { currentTag } = context;
                    context.currentTag = currentTag || matches?.[1]; // currentTag || matches ? matches[1] : null
                    const index = context.currentTag
                        ? semverTags.indexOf(context.currentTag)
                        : -1;
                    // if `keyCommit.gitTags` is not a semver
                    if (index === -1) {
                        context.currentTag = currentTag || null;
                    }
                    else {
                        const previousTag = semverTags[index + 1];
                        context.previousTag = previousTag;
                        if (!previousTag) {
                            if (options.append) {
                                context.previousTag = context.previousTag || firstCommitHash;
                            }
                            else {
                                context.previousTag = context.previousTag || lastCommitHash;
                            }
                        }
                    }
                }
                else {
                    context.previousTag = context.previousTag || semverTags[0];
                    if (context.version === 'Unreleased') {
                        if (options.append) {
                            context.currentTag = context.currentTag || lastCommitHash;
                        }
                        else {
                            context.currentTag = context.currentTag || firstCommitHash;
                        }
                    }
                    else if (!context.currentTag) {
                        if (tags?.prefix) {
                            context.currentTag = tags.prefix + (context.version || '');
                        }
                        else {
                            context.currentTag = guessNextTag(semverTags[0], context.version);
                        }
                    }
                }
                if (typeof context.linkCompare !== 'boolean' && context.previousTag && context.currentTag) {
                    context.linkCompare = true;
                }
                return context;
            },
            reverse: options.append,
            doFlush,
            ...writer
        };
        if (!finalOptions.debug && options.debug) {
            finalOptions.debug = bindLogNamespace('writer', options.debug);
        }
        return finalOptions;
    }
    async getSemverTags() {
        const { gitClient } = this;
        const { tags: params } = await this.params;
        const tags = [];
        for await (const tag of gitClient.getSemverTags(params)) {
            tags.push(tag);
        }
        return tags;
    }
    async *getCommits(semverTags, hostOptions) {
        const { gitClient } = this;
        const { options, commits, parser } = await this.params;
        const { reset, releaseCount } = options;
        const params = {
            from: reset
                ? undefined
                : releaseCount
                    ? semverTags[releaseCount - 1]
                    : undefined,
            ...commits
        };
        const parserParams = {
            ...parser
        };
        if (!parserParams.warn && options.warn) {
            parserParams.warn = bindLogNamespace('parser', options.warn);
        }
        if (options.append) {
            params.reverse = true;
        }
        if (hostOptions?.referenceActions && !parserParams.referenceActions?.length) {
            parserParams.referenceActions = hostOptions.referenceActions;
        }
        if (hostOptions?.issuePrefixes && !parserParams.issuePrefixes?.length) {
            parserParams.issuePrefixes = hostOptions.issuePrefixes;
        }
        try {
            await gitClient.verify('HEAD');
            let reverseTags = semverTags.slice().reverse();
            reverseTags.push('HEAD');
            if (params.from) {
                if (reverseTags.includes(params.from)) {
                    reverseTags = reverseTags.slice(reverseTags.indexOf(params.from));
                }
                else {
                    reverseTags = [params.from, 'HEAD'];
                }
            }
            else {
                reverseTags.unshift('');
            }
            const streams = [];
            for (let i = 1, len = reverseTags.length; i < len; i++) {
                streams.push(gitClient.getCommits({
                    ...params,
                    from: reverseTags[i - 1],
                    to: reverseTags[i]
                }, parserParams));
            }
            if (!params.reverse) {
                streams.reverse();
            }
            for (const stream of streams) {
                yield* stream;
            }
        }
        catch {
            yield* gitClient.getCommits(params, parserParams);
        }
    }
    async *transformCommits(commits) {
        const params = await this.params;
        const { transformCommit: transform } = params.options;
        let transformed;
        for await (const commit of commits) {
            transformed = await transformCommit(commit, transform, params);
            if (transformed) {
                yield transformed;
            }
        }
    }
    async getPackageJson(pkgPath, transform) {
        const { gitClient } = this;
        let pkg;
        if (pkgPath) {
            pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'));
        }
        else {
            pkg = (await findPackage(gitClient.cwd) || {});
        }
        normalizePackageData(pkg);
        if (!pkg.repository?.url) {
            try {
                const repoUrl = await gitClient.getConfig('remote.origin.url');
                if (repoUrl) {
                    pkg.repository = {
                        ...pkg.repository,
                        url: repoUrl
                    };
                }
            }
            catch { }
        }
        if (transform) {
            pkg = transform(pkg);
        }
        const result = {
            package: pkg
        };
        const repositoryURL = (pkg.repository?.url || pkg.repository);
        if (repositoryURL) {
            result.repository = parseHostedGitUrl(repositoryURL);
        }
        return result;
    }
    /**
     * Load configs from a preset
     * @param preset
     * @param loader - Preset module loader, if not provided, will use default loader
     * @returns this
     */
    loadPreset(preset, loader) {
        const loadPreset = loader ? createPresetLoader(loader) : defaultLoadPreset;
        const config = loadPreset(preset).then((config) => {
            if (!config) {
                throw Error('Preset is not loaded or have incorrect exports');
            }
            return config;
        });
        this.composeParams(config);
        return this;
    }
    /**
     * Set the config directly
     * @param config - Config object
     * @returns this
     */
    config(config) {
        this.composeParams(config);
        return this;
    }
    readPackage(pathOrTransform, maybeTransform) {
        const [pkgPath, transform] = typeof pathOrTransform === 'string'
            ? [pathOrTransform, maybeTransform]
            : [undefined, pathOrTransform];
        this.composeParams(this.getPackageJson(pkgPath, transform));
        return this;
    }
    /**
     * Set package.json data
     * @param pkg - Package.json data
     * @returns this
     */
    package(pkg) {
        this.composeParams({
            package: pkg
        });
        return this;
    }
    /**
     * Read repository info from the current git repository
     * @returns this
     */
    readRepository() {
        this.composeParams(this.gitClient.getConfig('remote.origin.url').then(repository => ({
            repository: parseHostedGitUrl(repository)
        })));
        return this;
    }
    /**
     * Set repository info
     * @param infoOrGitUrl - Hosted git info or git url
     * @returns this
     */
    repository(infoOrGitUrl) {
        const info = typeof infoOrGitUrl === 'string'
            ? parseHostedGitUrl(infoOrGitUrl)
            : infoOrGitUrl;
        this.composeParams({
            repository: info
        });
        return this;
    }
    /**
     * Set conventional-changelog options
     * @param options - Generator options
     * @returns this
     */
    options(options) {
        this.composeParams({
            options
        });
        return this;
    }
    /**
     * Set writer context data
     * @param context - Writer context data
     * @returns this
     */
    context(context) {
        this.composeParams({
            context
        });
        return this;
    }
    /**
     * Set params to get semver tags
     * @param params - Params to get the last semver tag
     * @returns this
     */
    tags(params) {
        this.composeParams({
            tags: params
        });
        return this;
    }
    /**
     * Set params to get commits
     * @param params - Params to get commits since last release
     * @param parserOptions - Parser options
     * @returns this
     */
    commits(params, parserOptions) {
        this.composeParams({
            commits: params,
            parser: parserOptions
        });
        return this;
    }
    /**
     * Set writer options
     * @param params - Writer options
     * @returns this
     */
    writer(params) {
        this.composeParams({
            writer: params
        });
        return this;
    }
    async *write(includeDetails) {
        const { gitClient } = this;
        const { options, repository, context } = await this.params;
        const hostOptions = getHostOptions(repository, context);
        if (!gitClient.debug && options.debug) {
            gitClient.debug = bindLogNamespace('git-client', options.debug);
        }
        if (!hostOptions && options.warn) {
            options.warn('core', `Host is not supported: ${context?.host || repository?.host}`);
        }
        const semverTags = await this.getSemverTags();
        const finalContext = await this.finalizeContext(semverTags, hostOptions);
        const writerOptions = await this.finalizeWriterOptions(semverTags, finalContext.version);
        const commits = this.getCommits(semverTags, hostOptions);
        const transformedCommits = this.transformCommits(commits);
        const changelogWriter = writeChangelog(finalContext, writerOptions, includeDetails);
        yield* changelogWriter(transformedCommits);
    }
    /**
     * Generate changelog to stream
     * @param includeDetails - Generate data objects instead of strings
     * @returns Changelog stream
     */
    writeStream(includeDetails) {
        return Readable.from(this.write(includeDetails));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVudGlvbmFsQ2hhbmdlbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbnZlbnRpb25hbENoYW5nZWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDNUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUtqQyxPQUFPLEVBR0wscUJBQXFCLEVBQ3JCLGFBQWEsRUFDZCxNQUFNLG9DQUFvQyxDQUFBO0FBQzNDLE9BQU8sRUFJTCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGNBQWMsRUFDZixNQUFNLCtCQUErQixDQUFBO0FBQ3RDLE9BQU8sRUFJTCxrQkFBa0IsRUFDbEIsVUFBVSxJQUFJLGlCQUFpQixFQUNoQyxNQUFNLHNDQUFzQyxDQUFBO0FBQzdDLE9BQU8sb0JBQW9CLE1BQU0sd0JBQXdCLENBQUE7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBV3RELE9BQU8sRUFDTCxjQUFjLEVBQ2QsWUFBWSxFQUNaLG1CQUFtQixFQUNuQixlQUFlLEVBQ2Ysc0JBQXNCLEVBQ3RCLGdCQUFnQixFQUNqQixNQUFNLFlBQVksQ0FBQTtBQUVuQixPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUE7QUFFeEI7O0dBRUc7QUFDSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2YsU0FBUyxDQUF1QjtJQUN6QyxNQUFNLENBQWlCO0lBRS9CLFlBQVksaUJBQWlELE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLGNBQWMsS0FBSyxRQUFRO1lBQ2pELENBQUMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLGNBQWMsQ0FBQztZQUMzQyxDQUFDLENBQUMsY0FBYyxDQUFBO1FBRWxCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFD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