import { MemoryCache } from '@/MemoryCache';
import axios from 'axios';

export function getResolver(storyIds, stories, cache: MemoryCache): any {
    const result = async (_, { first, skipText }) => {
        const kind = 'job';

        storyIds.splice(0, storyIds.length);
        stories.splice(0, stories.length);

        const ids: number[] = [];
        const cacheKey = `jobstoryids:${first}-${skipText ? 'skipText' : 'dontSkipText'}`;

        if (!cache.has(cacheKey)) {
            const resp = await axios.get(`${process.env.HACKERNEWS_API_URL}/jobstories.json?limitToFirst=${first + 5}&orderBy="$key"`);
            const data: number[] = resp.data;

            cache.put(cacheKey, data, 600);
            ids.push(...data);
        }

        const cacheData = cache.get(cacheKey);

        ids.push(...cacheData);
        ids.splice(first);

        const storyDataPromises = ids
            .map(id => {
                if (cache.has(`${kind}story:${id}`)) {
                    return null;
                }

                return axios.get(`${process.env.HACKERNEWS_API_URL}/item/${id}.json`);
            })
            .filter(item => item !== null);

        (await Promise.all(storyDataPromises))
            .map(resp => resp?.data)
            .filter(item => item !== null)
            .forEach(item => {
                cache.put(`${kind}story:${item.id}`, item, 3600);
            });

        for (const id of ids) {
            const storyItem = cache.get(`${kind}story:${id}`);

            if (!storyItem.text || !skipText) {
                stories.push(storyItem);
            }
        }

        return new Promise(resolve => resolve(stories));
    };

    return result;
}
