/* eslint-disable no-undef */

import { MemoryCache } from '@/lib/cache/MemoryCache';
import { getResolver } from '@/resolvers/Story/commentCount';

let cache: MemoryCache;
let resolver: any;

process.env.HACKERNEWS_API_URL = 'http://127.0.0.1:3031';

beforeEach(() => {
    cache = new MemoryCache();
    resolver = getResolver(cache);
});

it('it retrieves the descendants attribute and returns it', async () => {
    expect(resolver({ descendants: 12 })).toBe(12);
    expect(resolver({ descendants: 5 })).toBe(5);
    expect(resolver({ descendants: 0 })).toBe(0);
});
