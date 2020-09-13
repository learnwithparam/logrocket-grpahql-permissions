const { ApolloError, ForbiddenError } = require("apollo-server-express");
const tweets = require("./data");

// Provide resolver functions for your schema fields
module.exports = {
  Query: {
    hello: () => "Hello world!",
    tweets: () => {
      return tweets;
    },
    tweet: (_, { id }, { user }) => {
      // Check whether user is logged-in
      if (!user) return new ForbiddenError("Not Authorized");
      const tweetId = tweets.findIndex((tweet) => tweet.id === id);
      if (tweetId === -1) return new ApolloError("Tweet not found");
      return tweets[tweetId];
    },
  },
};
