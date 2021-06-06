/* eslint-disable no-undef */

import { MemoryCache } from '@/lib/cache/MemoryCache';
import { getResolver } from '@/resolvers/comments';

let cache: MemoryCache;
let resolver: any;

process.env.HACKERNEWS_API_URL = 'http://127.0.0.1:3031';

beforeEach(() => {
    cache = new MemoryCache();
    resolver = getResolver(cache);
});

it('it retrieves the comment data and returns it', async () => {
    const data = await resolver({ kids: [27397733] }, { first: 1 });

    expect(data).toMatchSnapshot();
});

it('it retrieves the comment data and caches it', async () => {
    await resolver({ kids: [27397733] }, { first: 1 });

    expect(cache.has('comment:27397733')).toBeTruthy();
});
