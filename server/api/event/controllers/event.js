"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");
var _ = require("lodash");

const sanitizeMember = (role, member, contact = false) => {
  var arr = ["_id", "given_name", "family_name", "picture"];
  if (role === "Committee") {
    arr.push("allergies");
    arr.push("other_medical");
    arr.push("date_of_birth");
    arr.push("bcu_awards");
    arr.push("bcu_coaching_awards");
  }
  if (contact && role) {
    arr.push("contact");
    member["contact"] = _.pick(member["contact"], ["mobile_phone", "email"]);
  }
  member = _.pick(member, arr);
  member["picture"] = strapi.config.functions.sanitize.picture(
    member["picture"]
  );
  return member;
};

const sanitize = (role, uid, obj) => {
  if (String(uid) == String(obj.lead_member.user)) role = "Committee";

  obj = _.omit(obj, ["created_by", "updated_by", "id"]);

  // Types
  obj["type"] = obj["type"].map((t) => _.pick(t, ["name", "colour"]));

  // Files & Forms
  if (!role) {
    _.unset(obj, "forms");
    _.unset(obj, "files");
  }

  // Lead member
  if (role) {
    obj["lead_member"] = sanitizeMember(role, obj["lead_member"], true);
  } else {
    _.unset(obj, "lead_member");
  }
  // Thumbnail
  // obj["thumbnail"] = strapi.config.functions.sanitize.picture(obj["thumbnail"]);

  if (!role) {
    _.unset(obj, "description");
  }

  // Attendees
  if (role) {
    obj["attendees"] = obj["attendees"].map((a) => {
      a.member = sanitizeMember(role, a.member);
      a = _.pick(a, ["role", "member"]);
      return a;
    });
  } else {
    _.unset(obj, "attendees");
  }

  if (role === "Committee") obj["userPrivileged"] = true;

  return obj;
};

let populate = ["type", "lead_member"];

module.exports = {
  /**
   * Custom event find, if they're not logged in, don't show any event information
   */
  async find(ctx) {
    const role = _.get(ctx.state.user, "role.name", false);
    const uid = _.get(ctx.state.user, "_id", false);

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
      sanitize(
        role,
        uid,
        sanitizeEntity(entity, { model: strapi.models.event })
      )
    );
  },

  async findPast() {
    var entities = await strapi.services.event.find({}, populate);
    entities = _.filter(entities, function (ent) {
      return new Date(ent.date_start) < new Date(new Date().toDateString());
    });

    return entities.map((e) =>
      sanitize(
        undefined,
        false,
        sanitizeEntity(e, { model: strapi.models.event })
      )
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.event.findOne({ id }, populate);

    const role = _.get(ctx.state.user, "role.name", false);
    const uid = _.get(ctx.state.user, "_id", null);

    if (ctx.state.user === undefined) {
      if (new Date(entity.date_start) > new Date(new Date().toDateString())) {
        ctx.response.status = 403;
        return "Not authed to access recent events"; // todo: graphQL returns weird error when this happens
      }
    }

    return sanitize(
      role,
      uid,
      sanitizeEntity(entity, { model: strapi.models.event })
    );
  },

  async going(ctx) {
    const { id } = ctx.params;

    return id;
  },
};
