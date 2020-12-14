"use strict";

const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;

    if (ctx.query._q) {
      entities = await strapi
        .query("committee-member")
        .search(ctx.query, ["member"]);
    } else {
      entities = await strapi
        .query("committee-member")
        .find(ctx.query, ["member"]);
    }

    entities.sort((a, b) => (a.order > b.order ? 1 : -1));

    return entities.map((entity) => {
      entity.member = _.pick(entity.member, [
        "given_name",
        "family_name",
        "picture.url",
      ]);

      return sanitizeEntity(entity, {
        model: strapi.models["committee-member"],
      });
    });
  },
};
