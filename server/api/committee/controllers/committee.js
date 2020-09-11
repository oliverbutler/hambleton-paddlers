"use strict";

const { sanitizeEntity } = require("strapi-utils");

const sanitizePublic = (member) => {
  delete member.user;
  delete member.created_by;
  delete member.updated_by;
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

    return entities.map((entity) =>
      sanitizePublic(sanitizeEntity(entity, { model: strapi.models.member }))
    );
  },
};
