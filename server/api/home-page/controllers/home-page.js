"use strict";

const { find } = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    return strapi.query("home-page").findOne({}, []);
  },
};
