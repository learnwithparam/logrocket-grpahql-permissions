const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { isLoggedinDirective } = require("./directives");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isLoggedin: isLoggedinDirective,
  },
  context: ({ req }) => {
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
