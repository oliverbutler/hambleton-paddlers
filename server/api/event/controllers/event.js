"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");
var _ = require("lodash");

const sanitizePublic = (ctx, event) => {
  if (ctx.state.user === undefined) {
    delete event.members_going;
    delete event.files;
  }
  return event;
};

module.exports = {
  /**
   * Custom event find, if they're not logged in, don't show any event information
   */
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.event.search(ctx.query);
    } else {
      entities = await strapi.services.event.find(ctx.query);
    }

    if (ctx.state.user === undefined) {
      entities = _.filter(entities, function (ent) {
        return new Date(ent.date_start) < new Date(new Date().toDateString());
      });
    }

    return entities.map((entity) =>
      sanitizePublic(
        ctx,
        sanitizeEntity(entity, { model: strapi.models.event })
      )
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.event.findOne({ id });

    if (ctx.state.user === undefined) {
      if (new Date(entity.date_start) > new Date(new Date().toDateString())) {
        ctx.response.status = 403;
        return "Not authed to access recent events"; // todo: graphQL returns weird error when this happens
      }
    }

    console.log(entity);

    return sanitizePublic(
      ctx,
      sanitizeEntity(entity, { model: strapi.models.event })
    );
  },
};
