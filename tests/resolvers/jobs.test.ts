/* eslint-disable no-undef */

import { MemoryCache } from '@/lib/cache/MemoryCache';
import { getResolver } from '@/resolvers/jobs';
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
    const req = { body: { first: 2, skipText: false } };
    const data = await resolver({}, { first: 2, skipText: false }, { req });

    for (const item of data) {
        item.expires = 0;
    }

    expect(data).toMatchSnapshot();
});

it('it retrieves the job ids and caches them', async () => {
    const req = { body: { query: 'abc', vars: 'bbb' } };
    const reqHash = hash(req.body);

    await resolver({}, { first: 2, skipText: false }, { req });

    expect(await cache.has(`jobstoryids:2:${reqHash}`)).toBeTruthy();
});

it('it retrieves each job story and caches it', async () => {
    const req = { body: { first: 2, skipText: false, a: 1, b: 2 } };
    const data = await resolver({}, { first: 2, skipText: false }, { req });

    data.forEach(item => {
        expect(cache.has(`jobstory:${item.id}`)).toBeTruthy();
    });

    for (const item in cache.map) {
        cache.map[item].ts = 0;
        cache.map[item].expires = 0;
    }

    expect(cache.map).toMatchSnapshot();
});
