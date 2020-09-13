const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.query("event-type").search(ctx.query, []);
    } else {
      entities = await strapi.query("event-type").find(ctx.query, []);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["event-type"] })
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.query("event-type", []).findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models["event-type"] });
  },
};
