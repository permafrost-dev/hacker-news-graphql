/* eslint-disable no-unused-vars */

import axios from 'axios';

export function getResolver(cache: any): any {
    const commentsResolver = async (parent, { first }) => {
        const comments: Record<string, any>[] = [];

        if (typeof parent['kids'] === 'undefined') {
            return new Promise(resolve => resolve([]));
        }

        const commentIds = parent.kids.slice(0, 1);

        for (const id of commentIds) {
            if (!cache.has(`comment:${id}`)) {
                // console.log(`getting comment ${id} from URL...`);

                const commentResp = await axios.get(`${process.env.HACKERNEWS_API_URL}/item/${id}.json`);
                const commentData: Record<string, any>[] = commentResp.data;

                cache.put(`comment:${id}`, commentData, 3600);
            }

            comments.push(cache.get(`comment:${id}`));
        }

        return new Promise(resolve => resolve(comments));
    };

    return commentsResolver;
}
