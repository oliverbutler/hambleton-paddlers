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

  // obj["payments"] = obj["payments"].map((p) => {
  //   return p;
  // });

  return sanitizeEntity(obj, {
    model: strapi.query("user", "users-permissions").model,
  });
};

module.exports = {
  async me(ctx) {
    var user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: ctx.state.user.id }, ["members"]);

    return sanitize(user);
  },
};
