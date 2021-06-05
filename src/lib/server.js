import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './typedef';
import resolvers from './resolver';

export const getApolloServer = isDevelopmentMode => {
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

export const getServer = (app, isDevelopmentMode) => {
    app.use(bodyParser.json());

    const server = getApolloServer(isDevelopmentMode);
    server.applyMiddleware({ app, path: '/graphql' });

    return app;
};
