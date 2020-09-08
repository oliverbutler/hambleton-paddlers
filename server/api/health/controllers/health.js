"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async health(ctx) {
    try {
      var user = ctx.state.user;
      delete user.password;
      delete user.resetPasswordToken;
      return ctx.state.user;
    } catch (e) {
      ctx.response.status = 401;
      return "Not Authed";
    }
  },
};
