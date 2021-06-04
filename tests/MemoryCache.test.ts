/* eslint-disable no-undef */

import { MemoryCache } from '../src/MemoryCache';

let cache: MemoryCache;

beforeEach(() => {
    cache = new MemoryCache();
});

it('adds items to the cache', () => {
    expect(cache.map['one']).toBeUndefined();

    cache.put('one', 1, 10);

    expect(cache.map['one']).not.toBeUndefined();
});

it('returns an item in the cache', () => {
    cache.put('one', 1, 10);

    expect(cache.get('one')).toStrictEqual(1);
});

it('returns null for an item not in the cache', () => {
    expect(cache.get('missing')).toBeNull();
});

it('determines if an item is in the cache', () => {
    cache.put('one', 1, 10);

    expect(cache.has('one')).toBeTruthy();
    expect(cache.has('two')).toBeFalsy();
});

it('purges expired items', () => {
    cache.put('one', 1, 10);
    cache.map['one'].expires = 0;

    cache.purge();

    expect(cache.map['one']).toBeUndefined();
});

it('purges expired entries before returning an item', () => {
    cache.put('one', 1, 10);
    cache.map['one'].expires -= 15 * 1000;

    expect(cache.get('one')).toBeNull();
    expect(cache.map['one']).toBeUndefined();
});

it('purges expired entries before checking if an item exists', () => {
    cache.put('one', 1, 10);
    cache.map['one'].expires -= 15 * 1000;

    expect(cache.has('one')).toBeFalsy();
    expect(cache.map['one']).toBeUndefined();
});
