"use strict";

const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

const sanitizeCommittee = (c) => {
  return _.pick(c, ["role", "description", "summary"]);
};

const sanitize = (obj) => {
  obj = _.omit(obj, ["created_by", "updated_by", "id", "contact"]);

  ["bcu_awards", "bcu_coaching_awards"].map((field) => {
    obj[field] = obj[field].map((o) => o._id);
  });

  obj["picture"] = _.pick(obj.picture, ["url"]);
  obj["user"] = _.pick(obj.user, ["_id"]);
  obj["committee"] = sanitizeCommittee(obj["committee"]);

  return obj;
};

module.exports = {
  /**
   * Custom event find, if they're not logged in, don't show any event information
   */
  async find(ctx) {
    var entities = await strapi.services.member.find({
      committee: { $ne: null },
    });

    entities = entities.map((entity) =>
      sanitize(sanitizeEntity(entity, { model: strapi.models.member }))
    );

    return entities.filter((e) => _.get(e, "committee.role", false));
  },
};
