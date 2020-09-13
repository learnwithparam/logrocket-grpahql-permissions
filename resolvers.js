const { ApolloError } = require("apollo-server-express");
const { combineResolvers } = require("graphql-resolvers");
const tweets = require("./data");
const { isLoggedin } = require("./middlewares");

// Provide resolver functions for your schema fields
module.exports = {
  Query: {
    hello: () => "Hello world!",
    tweets: () => {
      return tweets;
    },
    tweet: combineResolvers(isLoggedin, (_, { id }) => {
      const tweetId = tweets.findIndex((tweet) => tweet.id === id);
      if (tweetId === -1) return new ApolloError("Tweet not found");
      return tweets[tweetId];
    }),
  },
};
