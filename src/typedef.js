import { gql } from 'apollo-server-express';
const typeDefs = gql`
    type Story {
        by: String
        descendants: Int
        id: Int!
        kids: [Int]
        score: Int
        time: Int
        title: String
        type: String
        url: String
        comments(first: Int!): [Comment]
    }
    type Comment {
        by: String
        id: Int
        kids: [Int]
        parent: Int
        text: String
        time: Int
        type: String
    }
    type User {
        about: String
        created: Int
        delay: Int
        id: String!
        karma: Int
        submitted: [Int]
    }
    type Query {
        stories(first: Int!): [Story]
        user(id: String!): User
    }
`;
export default typeDefs;
