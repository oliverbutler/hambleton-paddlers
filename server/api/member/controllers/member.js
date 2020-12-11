"use strict";

const { sanitizeEntity, parseMultipartData } = require("strapi-utils");
const _ = require("lodash");
const { update } = require("lodash");

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


  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    const role = _.get(ctx.state.user, "role.name", false);
    const uid = _.get(ctx.state.user, "_id", null);

    let entity = await strapi.services.member.findOne({id});

    if(uid != _.get(entity, "users[0].id")) {
      ctx.response.status = 403;
      return "You may not edit a member you don't control"
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.member.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.member.update({ id }, ctx.request.body);
    }

    return "success"
  },
};
