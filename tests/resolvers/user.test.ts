/* eslint-disable no-undef */

import { MemoryCache } from '@/MemoryCache';
import { getResolver } from '@/resolvers/user';

let cache: MemoryCache;
let resolver: any;

process.env.HACKERNEWS_API_URL = 'http://127.0.0.1:3031';

beforeEach(() => {
    cache = new MemoryCache();
    resolver = getResolver(cache);
});

it('it retrieves the user data and returns it', async () => {
    const data = await resolver({}, { id: 'test' });

    expect(data).toMatchSnapshot();
});

it('it retrieves the user data and caches it', async () => {
    await resolver({}, { id: 'test' });

    expect(cache.has('user:test')).toBeTruthy();
});

it('it returns cached user data if cached', async () => {
    await resolver({}, { id: 'test' });

    cache.map['user:test'].value.karma = 9876;

    const data = await resolver({}, { id: 'test' });

    expect(data.karma).toBe(9876);
});
