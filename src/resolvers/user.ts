/* eslint-disable no-unused-vars */

import { MemoryCache } from '../MemoryCache';
import axios from 'axios';

export function getResolver(cache: MemoryCache): any {
    const userResolver = async (_, { id }) => {
        if (cache.has(`user:${id}`)) {
            return cache.get(`user:${id}`);
        }

        const resp = await axios.get(`${process.env.HACKERNEWS_API_URL}/user/${id}.json`);

        cache.put(`user:${id}`, resp.data, 3600);

        return cache.get(`user:${id}`);
    };

    return userResolver;
}
