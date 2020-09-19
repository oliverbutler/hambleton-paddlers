"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const sanitize = (obj) => {
  obj["picture"] = strapi.config.functions.sanitize.picture(obj["picture"]);
  obj = _.omit(obj, ["contact", "date_of_birth", "allergies", "other_medical"]);

  return obj;
};

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.member.search(ctx.query, []);
    } else {
      entities = await strapi.services.member.find(ctx.query, []);
    }

    return entities.map((entity) =>
      sanitize(sanitizeEntity(entity, { model: strapi.models.member }))
    );
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    let entity = await strapi.services.member.findOne({ id }, []);

    return sanitize(sanitizeEntity(entity, { model: strapi.models.member }));
  },
};
