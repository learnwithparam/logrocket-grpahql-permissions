const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
module.exports = gql`
  directive @isLoggedin on FIELD_DEFINITION

  type Query {
    hello: String
    tweets: [Tweet]!
    tweet(id: Int!): Tweet! @isLoggedin
  }

  type Tweet {
    id: Int!
    content: String!
    author: String!
  }
`;
