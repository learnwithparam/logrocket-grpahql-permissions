const {
  ForbiddenError,
  SchemaDirectiveVisitor,
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

class isLoggedinDirective extends SchemaDirectiveVisitor {
  visitObject(obj) {
    const fields = obj.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const originalResolve = field.resolve || defaultFieldResolver;

      field.resolve = async function (...args) {
        const context = args[2];
        const user = context.user || "";
        if (!user) {
          throw new ForbiddenError("Not Authorized");
        }

        const data = await originalResolve.apply(this, args);
        return data;
      };
    });
  }
}

module.exports = { isLoggedinDirective };
