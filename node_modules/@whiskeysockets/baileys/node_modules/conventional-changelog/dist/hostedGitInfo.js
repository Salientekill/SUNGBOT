function getType(domain) {
    if (domain.includes('github')) {
        return 'github';
    }
    if (domain.includes('gitlab')) {
        return 'gitlab';
    }
    if (domain.includes('bitbucket')) {
        return 'bitbucket';
    }
    if (domain.includes('git.sr.ht')) {
        return 'sourcehut';
    }
    return '';
}
function getHost(type) {
    switch (type) {
        case 'github':
            return 'https://github.com';
        case 'gitlab':
            return 'https://gitlab.com';
        case 'bitbucket':
            return 'https://bitbucket.org';
        case 'sourcehut':
            return 'https://git.sr.ht';
        default:
            return '';
    }
}
function getRepositoryUrl(type, host, owner, project, branch) {
    if (!host) {
        return '';
    }
    let treepath = '';
    if (branch) {
        if (type === 'bitbucket') {
            treepath = `/src/${encodeURIComponent(branch)}`;
        }
        else {
            treepath = `/tree/${encodeURIComponent(branch)}`;
        }
    }
    return `${host}/${owner}/${project}${treepath}`;
}
export function parseHostedGitUrl(input) {
    // github edge case with branch in the url
    let matches = input.match(/^(?:https:\/\/)?github\.com\/([^/]+)\/([^/.#]+)(?:\/tree\/[^/]+)?$/);
    if (matches) {
        return {
            url: input,
            type: 'github',
            host: 'https://github.com',
            owner: matches[1],
            project: matches[2]
        };
    }
    let type;
    let host;
    let owner;
    let project;
    // git+ssh and ssh urls
    matches = input.match(/^(?:(?:git\+)?ssh:\/\/(?:[^@]+@)?|[^@]+@)(?:www\.)?([^@:]+):([^/]+(?:\/[^/]+)?)\/([^/.#]+)(?:\.git)?(?:#(.+))?/);
    if (matches) {
        type = getType(matches[1]);
        host = `https://${matches[1]}`;
        owner = matches[2];
        project = matches[3];
        return {
            url: getRepositoryUrl(type, host, owner, project, matches[4]),
            type,
            host,
            owner,
            project
        };
    }
    // git+https and https urls
    matches = input.match(/^(?:(?:git\+)?https|git):\/\/(?:[^@]+@)?(?:www\.)?([^@/]+)\/([^/]+(?:\/[^/]+)?)\/([^/.#]+)(?:\.git)?(?:#(.+))?/);
    if (matches) {
        type = getType(matches[1]);
        host = `http${type || input.includes('https://') ? 's' : ''}://${matches[1]}`;
        owner = matches[2];
        project = matches[3];
        return {
            url: getRepositoryUrl(type, host, owner, project, matches[4]),
            type,
            host,
            owner,
            project
        };
    }
    // shortcuts
    matches = input.match(/^(?:([^@:]+):)?(?:[^@:]+@|[^@:]*:[^@:]+@)?([^/#]+(?:\/[^/]+)?)\/([^/.#]+)(?:\.git)?(?:#(.+))?/);
    if (matches) {
        type = matches[1] || 'github';
        host = getHost(type);
        owner = matches[2];
        project = matches[3];
        return {
            url: getRepositoryUrl(type, host, owner, project, matches[4]),
            type,
            host,
            owner,
            project
        };
    }
    matches = input.match(/^\w+:\/\/([^/]+)(\/[^#]+)?/);
    if (matches) {
        type = getType(matches[1]);
        host = `http${type || input.includes('https://') ? 's' : ''}://${matches[1]}`;
        return {
            url: `${host}${matches[2]?.replace(/\/?\.git.*/, '') || ''}`,
            type,
            host
        };
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdGVkR2l0SW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ob3N0ZWRHaXRJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLFNBQVMsT0FBTyxDQUFDLE1BQWM7SUFDN0IsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDOUIsT0FBTyxRQUFRLENBQUE7SUFDakIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQzlCLE9BQU8sUUFBUSxDQUFBO0lBQ2pCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLFdBQVcsQ0FBQTtJQUNwQixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7UUFDakMsT0FBTyxXQUFXLENBQUE7SUFDcEIsQ0FBQztJQUVELE9BQU8sRUFBRSxDQUFBO0FBQ1gsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLElBQVk7SUFDM0IsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNiLEtBQUssUUFBUTtZQUNYLE9BQU8sb0JBQW9CLENBQUE7UUFDN0IsS0FBSyxRQUFRO1lBQ1gsT0FBTyxvQkFBb0IsQ0FBQTtRQUM3QixLQUFLLFdBQVc7WUFDZCxPQUFPLHVCQUF1QixDQUFBO1FBQ2hDLEtBQUssV0FBVztZQUNkLE9BQU8sbUJBQW1CLENBQUE7UUFDNUI7WUFDRSxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FDdkIsSUFBYyxFQUNkLElBQVksRUFDWixLQUFhLEVBQ2IsT0FBZSxFQUNmLE1BQWM7SUFFZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFRCxJQUFJLFFBQVEsR0FBRyxFQUFF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