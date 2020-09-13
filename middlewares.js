const { ForbiddenError } = require("apollo-server-express");

// Middleware resolver
const isLoggedin = (parent, args, { user }, info) => {
  if (!user) throw new ForbiddenError("Not Authorized");
};

module.exports = { isLoggedin };
