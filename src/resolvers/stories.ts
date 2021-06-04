import axios from 'axios';

export function getResolver(topStoryIds, topStories, cache: any): any {
    const stories = async (_, { first, kind }) => {
        topStoryIds.splice(0, topStoryIds.length);
        topStories.splice(0, topStories.length);

        kind = `${kind}`.toLowerCase();

        const ids: number[] = [];
        const topstoryCacheKey = `${kind}storyids:${first}`;

        if (!cache.has(topstoryCacheKey)) {
            // console.log(`getting ${kind}storyids from URL...`);

            const resp = await axios.get(`${process.env.HACKERNEWS_API_URL}/${kind}stories.json?limitToFirst=${first}&orderBy="$key"`);
            const data: number[] = resp.data;

            cache.put(topstoryCacheKey, data, 60);
            ids.push(...data);
        }

        const cacheData = cache.get(topstoryCacheKey);

        ids.push(...cacheData);
        ids.splice(first);

        const storyDataPromises = ids
            .map(id => {
                if (cache.has(`${kind}story:${id}`)) {
                    return null;
                }

                // console.log(`getting story ${id} from URL...`);

                return axios.get(`${process.env.HACKERNEWS_API_URL}/item/${id}.json`);
            })
            .filter(item => item !== null);

        (await Promise.all(storyDataPromises))
            .map(resp => resp?.data)
            .filter(item => item !== null)
            .forEach(item => {
                cache.put(`${kind}story:${item.id}`, item, 600);
            });

        for (const id of ids) {
            topStories.push(cache.get(`${kind}story:${id}`));
        }

        return new Promise(resolve => resolve(topStories));
    };

    return stories;
}
