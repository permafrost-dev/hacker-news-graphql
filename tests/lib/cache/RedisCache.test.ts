/* eslint-disable no-undef */

import { RedisCache } from '@/lib/cache/RedisCache';

let cache: RedisCache;

beforeEach(() => {
    cache = new RedisCache();
});

afterEach(() => {
    cache.destroy();
});

it('adds items to the cache', async () => {
    expect(await cache.has('one')).toBeFalsy();

    cache.put('one', 1, 10);

    expect(await cache.get('one')).toBe(1);
});

it('returns an item in the cache', async () => {
    cache.put('one', 1, 10);

    expect(await cache.get('one')).toStrictEqual(1);
});

it('returns null for an item not in the cache', async () => {
    expect(await cache.get('missing')).toBeNull();
});

it('determines if an item is in the cache', async () => {
    cache.put('one', 1, 10);

    expect(await cache.has('one')).toBeTruthy();
    expect(await cache.has('two')).toBeFalsy();
});

// it('purges expired items', () => {
//     cache.put('one', 1, 10);
//     cache.map['one'].expires = 0;

//     cache.purge();

//     expect(cache.map['one']).toBeUndefined();
// });

// it('purges expired entries before returning an item', async () => {
//     cache.put('one', 1, 10);
//     cache.map['one'].expires -= 15 * 1000;

//     expect(await cache.get('one')).toBeNull();
//     expect(cache.map['one']).toBeUndefined();
// });

// it('purges expired entries before checking if an item exists', async () => {
//     cache.put('one', 1, 10);
//     cache.map['one'].expires -= 15 * 1000;

//     expect(await cache.has('one')).toBeFalsy();
//     expect(cache.map['one']).toBeUndefined();
// });
