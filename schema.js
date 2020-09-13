const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
module.exports = gql`
  directive @isLoggedin on OBJECT

  type Query {
    hello: String
    tweets: [Tweet]!
    tweet(id: Int!): Tweet!
  }

  type Tweet @isLoggedin {
    id: Int!
    content: String!
    author: String!
  }
`;
