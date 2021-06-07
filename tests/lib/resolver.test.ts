/* eslint-disable no-undef */

import { MemoryCache } from '@/lib/cache/MemoryCache';
import { RedisCache } from '@/lib/cache/RedisCache';
import { getCacheInstance, getResolvers } from '@/lib/resolver';

it('returns a MemoryCache instance for the "memory" driver', () => {
    const cache = getCacheInstance('memory');

    expect(cache).toBeInstanceOf(MemoryCache);
});

it('returns a MemoryCache instance an unknown driver', () => {
    const cache = getCacheInstance('unknown');

    expect(cache).toBeInstanceOf(MemoryCache);
});

it('returns a RedisCache instance for the "redis" driver', () => {
    const cache = getCacheInstance('redis');

    expect(cache).toBeInstanceOf(RedisCache);

    cache.destroy();
});

it('returns a resolver object', () => {
    process.env.NODE_ENV = 'testing';

    const resolvers = getResolvers('memory');

    expect(resolvers['Comment']).not.toBeUndefined();
    expect(resolvers['Date']).not.toBeUndefined();
    expect(resolvers['Job']).not.toBeUndefined();
    expect(resolvers['Query']).not.toBeUndefined();
    expect(resolvers['Story']).not.toBeUndefined();
});
