"use strict";

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.query("bcu-award").search(ctx.query, []);
    } else {
      entities = await strapi.query("bcu-award").find(ctx.query, []);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["bcu-award"] })
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.query("bcu-award").findOne({ id }, []);
    return sanitizeEntity(entity, { model: strapi.models["bcu-award"] });
  },
};
