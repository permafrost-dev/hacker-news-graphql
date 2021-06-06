import axios from 'axios';

export function getResolver(topStoryIds, topStories, cache: any): any {
    const stories = async (_, { first, kind }) => {
        topStoryIds.splice(0, topStoryIds.length);
        topStories.splice(0, topStories.length);

        kind = `${kind}`.toLowerCase();

        const ids: number[] = [];
        const topstoryCacheKey = `${kind}storyids:${first}`;

        const hasTopStoryKey = await cache.has(topstoryCacheKey);
        if (!hasTopStoryKey) {
            console.log(`getting ${kind}storyids from URL...`);

            const resp = await axios.get(`${process.env.HACKERNEWS_API_URL}/${kind}stories.json?limitToFirst=${first}&orderBy="$key"`);
            const data: number[] = resp.data;

            const cacheTtlMap = {
                new: 60,
                top: 300,
                best: 600,
            };

            const cacheTtl = cacheTtlMap[kind] || 60;

            cache.put(topstoryCacheKey, data, cacheTtl);
            ids.push(...data);
        }

        const cacheData = await cache.get(topstoryCacheKey);

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
                    cache.put(`${kind}story:${item.id}`, item, 600);
                } catch (err) {
                    console.log(err);
                }
            });

        for (const id of ids) {
            const item = await cache.get(`${kind}story:${id}`);

            topStories.push(item);
        }

        return new Promise(resolve => resolve(topStories));
    };

    return stories;
}
