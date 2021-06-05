import { gql } from 'apollo-server-express';
const typeDefs = gql`
    scalar Date

    enum StoryType {
        BEST
        NEW
        TOP
    }
    type Story {
        by: String
        descendants: Int
        id: Int!
        kids: [Int]
        score: Int
        time: Date
        title: String
        type: String
        url: String
        comments(first: Int!): [Comment]
        author: User
        commentCount: Int!
    }
    type Comment {
        by: String
        id: Int!
        kids: [Int]
        parent: Int
        text: String
        time: Date
        type: String
        author: User
    }
    type User {
        about: String
        created: Date
        delay: Int
        id: String!
        karma: Int
        submitted: [Int]
    }
    type Query {
        stories(first: Int!, kind: StoryType!): [Story]
        user(id: String!): User
    }
`;
export default typeDefs;
