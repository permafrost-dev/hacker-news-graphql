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
    const key = 'one-' + (Math.random() * 10000).toString();

    expect(await cache.has(key)).toBeFalsy();

    cache.put(key, 1, 10);

    expect(await cache.get(key)).toBe(1);
});

it('returns an item in the cache', async () => {
    const key = 'one-' + (Math.random() * 10000).toString();

    cache.put(key, 1, 10);

    expect(await cache.get(key)).toStrictEqual(1);
});

it('returns null for an item not in the cache', async () => {
    expect(await cache.get('missing')).toBeNull();
});

it('determines if an item is in the cache', async () => {
    const keys = ['one-' + (Math.random() * 10000).toString(), 'two-' + (Math.random() * 10000).toString()];

    cache.put(keys[0], 1, 10);

    expect(await cache.has(keys[0])).toBeTruthy();
    expect(await cache.has(keys[1])).toBeFalsy();
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
