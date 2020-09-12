"use strict";

const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

const sanitizePublic = (member) => {
  delete member.user;
  // delete member.created_by;
  // delete member.updated_by;
  delete member.date_of_birth;
  return member;
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
      sanitizePublic(sanitizeEntity(entity, { model: strapi.models.member }))
    );

    return entities.filter((e) => _.get(e, "committee.role", false));
  },
};
