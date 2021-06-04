import axios from 'axios';

export function getResolver(cache: any): any {
    const authorResolver = async parent => {
        const userCacheKey = `user:${parent.by}`;

        if (cache.has(userCacheKey)) {
            return cache.get(userCacheKey);
        }

        const url = `${process.env.HACKERNEWS_API_URL}/user/${parent.by}.json`;
        const resp = await axios.get(url);

        cache.put(userCacheKey, resp.data, 3600);

        return new Promise(resolve => resolve(cache.get(userCacheKey)));
    };

    return authorResolver;
}
