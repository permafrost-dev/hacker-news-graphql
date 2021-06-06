/* eslint-disable no-unused-vars */

import { MemoryCache } from '../lib/cache/MemoryCache';
import axios from 'axios';

export function getResolver(cache: MemoryCache): any {
    const userResolver = async (_, { id }) => {
        const hasKey = await cache.has(`user:${id}`);

        if (hasKey) {
            return await cache.get(`user:${id}`);
        }

        const resp = await axios.get(`${process.env.HACKERNEWS_API_URL}/user/${id}.json`);

        cache.put(`user:${id}`, resp.data, 3600);

        return resp.data;
    };

    return userResolver;
}
