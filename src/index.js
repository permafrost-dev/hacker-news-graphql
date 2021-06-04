import { App } from '@tinyhttp/app';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './typedef';
import resolvers from './resolver';

require('dotenv').config();

const app = new App();

const port = parseInt(process.env.PORT) || 3000;
const isDevelopmentMode = process.env.NODE_ENV === 'development';

app.use(bodyParser.json());

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

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
