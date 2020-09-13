"use strict";

const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

const sanitize = (obj) => {
  obj["picture"] = _.pick(obj.picture, ["url"]);
  _.unset(obj, ["contact"]);

  return obj;
};

module.exports = {
  /**
   * Custom event find, if they're not logged in, don't show any event information
   */
  async find(ctx) {
    var entities = await strapi.query("member").find({}, []);

    return entities
      .map((entity) =>
        sanitize(sanitizeEntity(entity, { model: strapi.models.member }))
      )
      .filter((e) => _.get(e, "committee.role", false));
  },
};
