import { gql } from "apollo-server-express"
const typeDefs = gql`
  type Story {
    by: String
    descendants: Int
    kids: [Int]
    score: Int
    time: Int
    title: String
    Type: String
    url: String
  }
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }
  type Post {
    id: Int!
    title: String
    authorId: ID!
    votes: Int
    author: Author
  }
  input PostData {
    id: Int!
    title: String
    authorId: ID!
    votes: Int
  }
  type Response {
    success: Boolean
  }
  type Query {
    posts: [Post]
    authors(first: Int!): [Author]
    author(id: Int!): Author
    stories(first: Int!): [Story]
  }
  type Mutation {
    createPost(post: PostData): Response
  }
`
export default typeDefs
