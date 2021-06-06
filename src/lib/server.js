import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './typedef';
import { getResolvers } from './resolver';

export const getApolloServer = (isDevelopmentMode, cacheDriver) => {
    const resolvers = getResolvers(cacheDriver);

    const server = new ApolloServer({
        introspection: isDevelopmentMode,
        graphiql: isDevelopmentMode,
        typeDefs,
        resolvers,
        formatError: error => {
            return error;
        },
        context: ({ req, res }) => {
            return { req, res };
        },
    });

    return server;
};

export const getServer = (app, isDevelopmentMode, cacheDriver) => {
    app.use(bodyParser.json());

    const server = getApolloServer(isDevelopmentMode, cacheDriver);
    server.applyMiddleware({ app, path: '/graphql' });

    return app;
};
