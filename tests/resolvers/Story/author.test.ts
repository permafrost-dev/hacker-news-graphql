/* eslint-disable no-undef */

import { MemoryCache } from '../../../src/lib/cache/MemoryCache';
import { getResolver } from '../../../src/resolvers/Story/author';

let cache: MemoryCache;
let resolver: any;

process.env.HACKERNEWS_API_URL = 'http://127.0.0.1:3031';

beforeEach(() => {
    cache = new MemoryCache();
    resolver = getResolver(cache);
});

it('it retrieves the user data and returns it', async () => {
    const parent = { by: 'test' };
    const userData = await resolver(parent);

    expect(userData).toMatchSnapshot();
});

it('it retrieves the user data and caches it', async () => {
    await resolver({ by: 'test' });

    expect(cache.has('user:test')).toBeTruthy();
});
