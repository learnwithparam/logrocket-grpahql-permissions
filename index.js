const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const permissions = require("./permissions");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  resolvers,
  context: async ({ req }) => {
    return {
      user: req.headers.user || "",
    };
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
