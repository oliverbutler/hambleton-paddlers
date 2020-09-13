"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");
var _ = require("lodash");

const sanitizeMember = (member, contact = false) => {
  var arr = ["_id", "given_name", "family_name", "picture"];
  if (contact) {
    arr.push("contact");
    member["contact"] = _.pick(member["contact"], ["mobile_phone", "email"]);
  }
  member = _.pick(member, arr);
  member["picture"] = _.pick(member["picture"], "url");
  return member;
};

const sanitize = (obj) => {
  obj = _.omit(obj, ["created_by", "updated_by", "id"]);

  obj["type"] = obj["type"].map((t) => t.name);

  // Lead member
  obj["lead_member"] = sanitizeMember(obj["lead_member"], true);

  // Thumbnail
  obj["thumbnail"] = _.pick(obj["thumbnail"], "url");

  // Attendees
  obj["attendees"] = obj["attendees"].map((a) => {
    a.member = sanitizeMember(a.member);
    a = _.pick(a, ["role", "member"]);
    return a;
  });

  return obj;
};

let populate = ["type", "lead_member"];

module.exports = {
  /**
   * Custom event find, if they're not logged in, don't show any event information
   */
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.event.search(ctx.query, populate);
    } else {
      entities = await strapi.services.event.find(ctx.query, populate);
    }

    if (ctx.state.user === undefined) {
      entities = _.filter(entities, function (ent) {
        return new Date(ent.date_start) < new Date(new Date().toDateString());
      });
    }

    return entities.map((entity) =>
      sanitize(sanitizeEntity(entity, { model: strapi.models.event }))
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.event.findOne({ id }, populate);

    if (ctx.state.user === undefined) {
      if (new Date(entity.date_start) > new Date(new Date().toDateString())) {
        ctx.response.status = 403;
        return "Not authed to access recent events"; // todo: graphQL returns weird error when this happens
      }
    }

    return sanitize(sanitizeEntity(entity, { model: strapi.models.event }));
  },
};
