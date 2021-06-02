/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { App } from '@tinyhttp/app';
import graphql from 'graphql';
//import expressGraphQL from 'express-graphql'

import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typedef.js';
import resolvers from './resolver.js';

const app = new App();
const port = parseInt(process.env.PORT) || 3030;

/*
const schema = graphql.buildSchema(`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => 'Hello world!'
}

app.use(
  '/graphql',
  expressGraphQL.graphqlHTTP({
    schema,
    graphiql: { headerEditorEnabled: true },
    rootValue
  })
)
*/

app.use(bodyParser.json());

const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    formatError: error => {
        return error;
    },
    context: ({ req, res }) => {
        return {
            req,
            res,
        };
    },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
