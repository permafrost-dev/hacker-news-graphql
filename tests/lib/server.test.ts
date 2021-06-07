/* eslint-disable no-undef */

import { App } from '@tinyhttp/app';
import { MemoryCache } from '@/lib/cache/MemoryCache';
import { getApolloServer, getServer } from '@/lib/server';
import { ApolloServer } from 'apollo-server-express';

it('returns an instance of Apollo Server', () => {
    const server = getApolloServer(true, new MemoryCache());

    expect(server).toBeInstanceOf(ApolloServer);
});

it('returns an instance of tinyhttp/app', () => {
    const server = getServer(new App(), true, new MemoryCache());

    expect(server).toBeInstanceOf(App);
});
