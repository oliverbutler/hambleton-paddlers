"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const sanitizeTest = (member) => {
  return member;
};

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.member.search(ctx.query);
    } else {
      entities = await strapi.services.member.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeTest(sanitizeEntity(entity, { model: strapi.models.member }))
    );
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.member.findOne({ id });

    return sanitizeTest(
      sanitizeEntity(entity, { model: strapi.models.member })
    );
  },
};
