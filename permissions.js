const { ForbiddenError } = require("apollo-server-express");
const { allow, shield, rule } = require("graphql-shield");

const isLoggedin = rule({ cache: "contextual" })(
  async (parent, args, { user }, info) => {
    if (user) return true;
    return new ForbiddenError("Not Authorized");
  }
);

const permissions = shield({
  Query: {
    "*": allow,
  },
  Tweet: {
    author: isLoggedin,
  },
});

module.exports = permissions;
