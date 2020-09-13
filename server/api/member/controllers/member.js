"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const sanitize = (obj) => {
  obj = _.omit(obj, ["created_by", "updated_by", "id"]);

  ["bcu_awards", "bcu_coaching_awards"].map((field) => {
    obj[field] = obj[field].map((o) => o._id);
  });

  obj["picture"] = _.pick(obj.picture, ["url"]);

  obj["user"] = _.pick(obj.user, ["_id"]);

  return obj;
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
      sanitize(sanitizeEntity(entity, { model: strapi.models.member }))
    );
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.member.findOne({ id });

    return sanitize(sanitizeEntity(entity, { model: strapi.models.member }));
  },
};
