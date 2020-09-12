"use strict";

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const sanitizePublic = (o) => {
  delete o.created_by;
  delete o.updated_by;
  delete o.id;
  return o;
};

module.exports = {
  async find(ctx) {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services["bcu-award"].search(ctx.query);
    } else {
      entities = await strapi.services["bcu-award"].find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizePublic(
        sanitizeEntity(entity, { model: strapi.models["bcu-award"] })
      )
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services["bcu-award"].findOne({ id });
    return sanitizePublic(
      sanitizeEntity(entity, { model: strapi.models["bcu-award"] })
    );
  },
};
