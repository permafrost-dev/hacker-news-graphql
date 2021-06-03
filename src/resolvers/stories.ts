import axios from 'axios';

export function getResolver(topStoryIds, topStories, cache: any): any {
    const stories = async (_, { first }) => {
        topStoryIds.splice(0, topStoryIds.length);
        topStories.splice(0, topStories.length);

        const ids: number[] = [];
        const topstoryCacheKey = `topstoryids:${first}`;

        if (!cache.has(topstoryCacheKey)) {
            console.log('getting topstoryids from URL...');

            const resp = await axios.get(`https://hacker-news.firebaseio.com/v0/newstories.json?limitToFirst=${first}&orderBy="$key"`);
            const data: number[] = resp.data;

            cache.put(topstoryCacheKey, data, 60);
            ids.push(...data);
        }

        const cacheData = cache.get(topstoryCacheKey);

        ids.push(...cacheData);
        ids.splice(first);

        const storyDataPromises = ids
            .map(id => {
                if (cache.has(`topstory:${id}`)) {
                    return null;
                }

                console.log(`getting story ${id} from URL...`);

                return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            })
            .filter(item => item !== null);

        (await Promise.all(storyDataPromises))
            .map(resp => resp?.data)
            .filter(item => item !== null)
            .forEach(item => {
                cache.put(`topstory:${item.id}`, item, 600);
            });

        for (const id of ids) {
            topStories.push(cache.get(`topstory:${id}`));
        }

        return new Promise(resolve => resolve(topStories));
    };

    return stories;
}
