import { Cache } from './cache/Cache';
import { RedisCache } from './cache/RedisCache';
import { MemoryCache } from './cache/MemoryCache';
import { getResolver as getCommentsResolver } from '@/resolvers/comments';
import { getResolver as getJobsResolver } from '@/resolvers/jobs';
import { getResolver as getStoriesResolver } from '@/resolvers/stories';
import { getResolver as getStoryAuthorResolver } from '@/resolvers/Story/author';
import { getResolver as getCommentCountResolver } from '@/resolvers/Story/commentCount';
import { getResolver as getUserResolver } from '@/resolvers/user';
import { getScalarType as getDateScalar } from '@/scalars/Date';

export const getCacheInstance = (driver: string): Cache => {
    switch (driver) {
        case 'redis':
            return new RedisCache();

        case 'memory':
        default:
            return new MemoryCache();
    }
};

export const getResolvers = (cacheDriver: string) => {
    const storyIds: number[] = [];
    const stories: Record<string, any>[] = [];
    const jobIds: number[] = [];
    const jobs: Record<string, any>[] = [];
    const cache = getCacheInstance(cacheDriver);

    const dateScalar = getDateScalar();

    const resolvers = {
        query: {
            stories: getStoriesResolver(storyIds, stories, cache),
            jobs: getJobsResolver(jobIds, jobs, cache),
            user: getUserResolver(cache),
        },
        job: {
            author: getStoryAuthorResolver(cache),
        },
        story: {
            author: getStoryAuthorResolver(cache),
            comments: getCommentsResolver(cache),
            commentCount: getCommentCountResolver(cache),
        },
        comment: {
            author: getStoryAuthorResolver(cache),
        },
    };

    return {
        Date: dateScalar,
        Query: {
            jobs: resolvers.query.jobs,
            stories: resolvers.query.stories,
            user: resolvers.query.user,
        },
        Job: {
            author: resolvers.job.author,
        },
        Story: {
            author: resolvers.story.author,
            comments: resolvers.story.comments,
            commentCount: resolvers.story.commentCount,
        },
        Comment: {
            author: resolvers.comment.author,
        },
    };
};
