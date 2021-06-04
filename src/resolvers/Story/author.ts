import axios from 'axios';

export function getResolver(cache: any): any {
    const authorResolver = async parent => {
        const userCacheKey = `user:${parent.by}`;

        if (cache.has(userCacheKey)) {
            return cache.get(userCacheKey);
        }

        const resp = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${parent.by}.json`);

        cache.put(userCacheKey, resp.data, 3600);

        return new Promise(resolve => resolve(cache.get(userCacheKey)));
    };

    return authorResolver;
}
