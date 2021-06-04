import { MemoryCache } from './MemoryCache';
import { getResolver as getStoriesResolver } from './resolvers/stories';
import { getResolver as getCommentsResolver } from './resolvers/comments';
import { getResolver as getUserResolver } from './resolvers/user';
import axios from 'axios';
import { scalarType as dateScalar } from './scalars/Date';

const topStoryIds: number[] = [];
const topStories: Record<string, any>[] = [];
const cache = new MemoryCache();

const storiesResolver = getStoriesResolver(topStoryIds, topStories, cache);
const commentsResolver = getCommentsResolver(cache);
const userResolver = getUserResolver(cache);

export default {
    Date: dateScalar,
    Query: {
        stories: storiesResolver,
        user: userResolver,
    },
    Story: {
        comments: commentsResolver,
        async author(parent) {
            if (cache.has(`user:${parent.by}`)) {
                return cache.get(`user:${parent.by}`);
            }

            const resp = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${parent.by}.json`);

            cache.put(`user:${parent.by}`, resp.data, 3600);

            return new Promise(resolve => resolve(cache.get(`user:${parent.by}`)));
        },
    },
    // Post: {
    //     author(parent) {
    //         return find(authors, { id: parent.authorId });
    //     },
    //     //author: (_, { authorId }) => find(authors, { authorId }),
    // },
    // Mutation: {
    //     createPost: (_, newPost) => {
    //         // console.log("new post",newPost.post.id);
    //         posts.push(newPost.post);
    //         // console.log("posts",posts);
    //         let result = {
    //             success: true,
    //         };
    //         return result;
    //     },
    // },
};
