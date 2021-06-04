import { MemoryCache } from './MemoryCache';
import { getResolver as getCommentsResolver } from './resolvers/comments';
import { getResolver as getStoriesResolver } from './resolvers/stories';
import { getResolver as getStoryAuthorResolver } from './resolvers/Story/author';
import { getResolver as getUserResolver } from './resolvers/user';
import { scalarType as dateScalar } from './scalars/Date';

const storyIds: number[] = [];
const stories: Record<string, any>[] = [];
const cache = new MemoryCache();

const resolvers = {
    query: {
        stories: getStoriesResolver(storyIds, stories, cache),
        user: getUserResolver(cache),
    },
    story: {
        author: getStoryAuthorResolver(cache),
        comments: getCommentsResolver(cache),
    },
};

export default {
    Date: dateScalar,
    Query: {
        stories: resolvers.query.stories,
        user: resolvers.query.user,
    },
    Story: {
        author: resolvers.story.author,
        comments: resolvers.story.comments,
    },
};
