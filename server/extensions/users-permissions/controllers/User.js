"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const sanitize = (obj) => {
  // obj["picture"] = _.pick(obj.picture, ["url"]);

  // obj = _.omit(obj, [""]);

  return obj;
};

module.exports = {
  async me(ctx) {
    var user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: ctx.state.user.id }, []);

    return user;

    // return sanitize(
    //   sanitizeEntity(strapi.query("user", "users-permissions").model, user)
    // );
  },
};
