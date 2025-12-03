#!/usr/bin/env node
import { createReadStream, createWriteStream } from 'fs';
import {} from '../index.js';
import { parseOptions, parseCommitsOptions, parseTagsOptions } from './options.js';
import { loadDataFile, isFileExists } from './utils.js';
export const flags = {
    infile: {
        shortFlag: 'i',
        default: 'CHANGELOG.md',
        type: 'string'
    },
    outfile: {
        shortFlag: 'o',
        type: 'string'
    },
    stdout: {
        type: 'boolean'
    },
    preset: {
        shortFlag: 'p',
        type: 'string'
    },
    pkg: {
        shortFlag: 'k',
        type: 'string'
    },
    append: {
        shortFlag: 'a',
        type: 'boolean'
    },
    releaseCount: {
        shortFlag: 'r',
        type: 'number'
    },
    skipUnstable: {
        type: 'boolean'
    },
    outputUnreleased: {
        shortFlag: 'u',
        type: 'boolean'
    },
    verbose: {
        shortFlag: 'v',
        type: 'boolean'
    },
    config: {
        shortFlag: 'n',
        type: 'string'
    },
    context: {
        shortFlag: 'c',
        type: 'string'
    },
    firstRelease: {
        shortFlag: 'f',
        type: 'boolean'
    },
    lernaPackage: {
        shortFlag: 'l',
        type: 'string'
    },
    tagPrefix: {
        shortFlag: 't',
        type: 'string'
    }
};
export async function runProgram(generator, flags) {
    let { infile, outfile, stdout, verbose, pkg, preset, config, context } = flags;
    generator.readPackage(pkg);
    if (preset) {
        generator.loadPreset(preset);
    }
    if (config) {
        const configOptions = await loadDataFile(config);
        if (configOptions.tags) {
            generator.tags(configOptions.tags);
        }
        if (configOptions.commits || configOptions.parser) {
            generator.commits(configOptions.commits || {}, configOptions.parser);
        }
        if (configOptions.writer) {
            generator.writer(configOptions.writer);
        }
    }
    if (context) {
        const writerContext = await loadDataFile(context);
        if (writerContext) {
            generator.context(writerContext);
        }
    }
    const options = parseOptions(flags);
    if (options) {
        generator.options(options);
    }
    const tagsOptions = parseTagsOptions(flags);
    if (tagsOptions) {
        generator.tags(tagsOptions);
    }
    const commitsOptions = parseCommitsOptions(flags);
    if (commitsOptions) {
        generator.commits(commitsOptions);
    }
    if (verbose) {
        generator.options({
            debug(namespace, payload) {
                console.info(`[${namespace}]:`, payload);
            },
            warn(namespace, payload) {
                console.warn(`[${namespace}]:`, payload);
            }
        });
    }
    outfile ||= infile;
    const sameFile = !stdout && infile === outfile;
    const changelog = generator.write();
    const streams = [];
    if (infile && options?.releaseCount !== 0) {
        const isInfileExists = await isFileExists(infile);
        const input = isInfileExists
            ? createReadStream(infile)
            : [];
        if (!isInfileExists && verbose) {
            console.warn(`"${infile}" does not exist.`);
        }
        if (sameFile) {
            if (options?.append) {
                streams.push(changelog);
            }
            else {
                const buffer = [];
                for await (const chunk of changelog) {
                    buffer.push(chunk);
                }
                for await (const chunk of input) {
                    buffer.push(chunk);
                }
                streams.push(buffer);
            }
        }
        else if (options?.append) {
            streams.push(input, changelog);
        }
        else {
            streams.push(changelog, input);
        }
    }
    else {
        streams.push(changelog);
    }
    const output = (outfile && !stdout
        ? createWriteStream(outfile, {
            flags: sameFile && options?.append ? 'a' : 'w'
        })
        : process.stdout);
    for (const stream of streams) {
        for await (const chunk of stream) {
            output.write(chunk);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFFTCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sSUFBSSxDQUFBO0FBQ1gsT0FBTyxFQUdOLE1BQU0sYUFBYSxDQUFBO0FBQ3BCLE9BQU8sRUFDTCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNqQixNQUFNLGNBQWMsQ0FBQTtBQUNyQixPQUFPLEVBQ0wsWUFBWSxFQUNaLFlBQVksRUFDYixNQUFNLFlBQVksQ0FBQTtBQW9CbkIsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHO0lBQ25CLE1BQU0sRUFBRTtRQUNOLFNBQVMsRUFBRSxHQUFHO1FBQ2QsT0FBTyxFQUFFLGNBQWM7UUFDdkIsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxHQUFHO1FBQ2QsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sU0FBUyxFQUFFLEdBQUc7UUFDZCxJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsU0FBUyxFQUFFLEdBQUc7UUFDZCxJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sU0FBUyxFQUFFLEdBQUc7UUFDZCxJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNELFlBQVksRUFBRTtRQUNaLFNBQVMsRUFBRSxHQUFHO1FBQ2QsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsU0FBUyxFQUFFLEdBQUc7UUFDZCxJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxH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