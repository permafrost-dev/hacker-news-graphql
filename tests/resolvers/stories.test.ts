/* eslint-disable no-undef */

import { MemoryCache } from '@/MemoryCache';
import { getResolver } from '@/resolvers/stories';

let cache: MemoryCache;
let resolver: any;
const storyIds: number[] = [];
const stories: Record<string, any>[] = [];

process.env.HACKERNEWS_API_URL = 'http://127.0.0.1:3031';

beforeEach(() => {
    cache = new MemoryCache();
    resolver = getResolver(storyIds, stories, cache);
});

it('it retrieves the story data and returns it', async () => {
    const data = await resolver({}, { first: 2, kind: 'NEW' });

    for (const item of data) {
        //item.ts = 0;
        item.expires = 0;
    }

    expect(data).toMatchSnapshot();
});

it('it retrieves the user data and caches it', async () => {
    await resolver({}, { first: 2, kind: 'NEW' });

    expect(cache.has('newstoryids:2')).toBeTruthy();
});

it('it retrieves each story and caches it', async () => {
    const data = await resolver({}, { first: 2, kind: 'NEW' });

    data.forEach(item => {
        expect(cache.has(`newstory:${item.id}`)).toBeTruthy();
    });

    for (const item in cache.map) {
        cache.map[item].ts = 0;
        cache.map[item].expires = 0;
    }

    expect(cache.map).toMatchSnapshot();
});
