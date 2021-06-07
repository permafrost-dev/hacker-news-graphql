/* eslint-disable no-undef */

import { RedisCache } from '@/lib/cache/RedisCache';
const Redis = require('ioredis');

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

it('prefixes all keys with a prefix', async () => {
    const testRedis = new Redis();
    const customCache = new RedisCache('myprefix');

    try {
        customCache.put('one', 1, 10);

        expect(await customCache.has('one')).toBeTruthy();
        expect(await testRedis.exists('myprefix:one')).toBeTruthy();
    } finally {
        customCache.destroy();
        testRedis.disconnect();
    }
});

it('purges expired items', () => {
    expect(cache.purge()).toBeTruthy();
});

it('clears items', () => {
    expect(cache.clear()).toBeTruthy();
});
