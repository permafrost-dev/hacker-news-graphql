import { MemoryCache } from './MemoryCache';
import { getResolver as getStoriesResolver } from './resolvers/stories';
import { getResolver as getCommentsResolver } from './resolvers/comments';
import { getResolver as getUserResolver } from './resolvers/user';

const topStoryIds: number[] = [];
const topStories: Record<string, any>[] = [];
const cache = new MemoryCache();

const storiesResolver = getStoriesResolver(topStoryIds, topStories, cache);
const commentsResolver = getCommentsResolver(cache);
const userResolver = getUserResolver(cache);

export default {
    Query: {
        stories: storiesResolver,
        user: userResolver,
    },
    Story: {
        comments: commentsResolver,
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
