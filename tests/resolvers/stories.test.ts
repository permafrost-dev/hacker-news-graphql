/* eslint-disable no-undef */

import { MemoryCache } from '@/lib/cache/MemoryCache';
import { getResolver } from '@/resolvers/stories';
const hash = require('object-hash');

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
    const req = { body: { first: 2, kind: 'NEW', a: 1, b: 2 } };
    const data = await resolver({}, { first: 2, kind: 'NEW' }, { req });

    for (const item of data) {
        //item.ts = 0;
        item.expires = 0;
    }

    expect(data).toMatchSnapshot();
});

it('it retrieves the user data and caches it', async () => {
    const req = { body: { query: 'abc', vars: 'bbb' } };
    const reqHash = hash(req.body);

    await resolver({}, { first: 2, kind: 'NEW' }, { req });

    expect(await cache.has(`newstoryids:2:${reqHash}`)).toBeTruthy();
});

it('it retrieves each story and caches it', async () => {
    const req = { body: { first: 2, kind: 'NEW', a: 1, b: 2 } };
    const data = await resolver({}, { first: 2, kind: 'NEW' }, { req });

    data.forEach(item => {
        expect(cache.has(`newstory:${item.id}`)).toBeTruthy();
    });

    for (const item in cache.map) {
        cache.map[item].ts = 0;
        cache.map[item].expires = 0;
    }

    expect(cache.map).toMatchSnapshot();
});
