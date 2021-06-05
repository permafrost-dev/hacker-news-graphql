import { gql } from 'apollo-server-express';

const typeDefs = gql`
    ${require('./schemas/Comment.graphql')}
    ${require('./schemas/Date.graphql')}
    ${require('./schemas/Query.graphql')}
    ${require('./schemas/Story.graphql')}
    ${require('./schemas/StoryType.graphql')}
    ${require('./schemas/User.graphql')}
`;

export default typeDefs;
