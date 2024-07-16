export const extractDomain = (url: string): string => {
    try {
        const hostname = new URL(url).hostname;
        const domainParts = hostname.split('.').filter(part => part.length > 0);
        if (domainParts.length >= 2) {
            const mainDomain = domainParts[domainParts.length - 2] + '.' + domainParts[domainParts.length - 1];
            return mainDomain;
        }
        return hostname;
    } catch (e) {
        console.error(e);
        return '';
    }
};