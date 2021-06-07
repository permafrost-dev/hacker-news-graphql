import { Cache } from '@/lib/cache/Cache';
import axios from 'axios';
const hash = require('object-hash');

export function getResolver(storyIds, stories, cache: Cache): any {
    const result = async (_, { first, skipText }, { req }) => {
        const kind = 'job';

        storyIds.splice(0, storyIds.length);
        stories.splice(0, stories.length);

        const queryHash = hash(req.body);

        const ids: number[] = [];
        //const cacheKey = `jobstoryids:${first}-${skipText ? 'skipText' : 'dontSkipText'}`;
        const cacheKey = `jobstoryids:${first}:${queryHash}`;

        console.log('cacheKey = ', cacheKey);

        const hasKey = await cache.has(cacheKey);

        if (!hasKey) {
            console.log(`getting ${kind}storyids from URL...`);

            const resp = await axios.get(`${process.env.HACKERNEWS_API_URL}/jobstories.json?limitToFirst=${first + 5}&orderBy="$key"`);
            const data: number[] = resp.data;

            cache.put(cacheKey, data, 600);
            ids.push(...data);
        }

        const cacheData = await cache.get(cacheKey);

        ids.push(...cacheData);
        ids.splice(first);

        const storyDataPromises = ids
            .map(async id => {
                if (await cache.has(`${kind}story:${id}`)) {
                    return cache.get(`${kind}story:${id}`);
                }

                console.log(`getting story ${id} from URL...`);

                return axios.get(`${process.env.HACKERNEWS_API_URL}/item/${id}.json`);
            })
            .filter(item => item !== null);

        (await Promise.all(storyDataPromises))
            .map((resp: any) => resp?.data)
            .filter(item => item !== null)
            .filter(item => typeof item !== 'undefined')
            .forEach(item => {
                try {
                    cache.put(`${kind}story:${item.id}`, item, 3600);
                } catch (err) {
                    console.log(err);
                }
            });
        for (const id of ids) {
            const storyItem = await cache.get(`${kind}story:${id}`);

            if (!skipText || typeof storyItem['text'] === 'undefined' || storyItem['text'] === null) {
                stories.push(storyItem);
            }
        }

        return new Promise(resolve => resolve(stories));
    };

    return result;
}
