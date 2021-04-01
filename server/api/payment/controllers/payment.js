"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  createPaymentIntent: async (ctx) => {
    // Only let them open an intent to pay if  they can! Otherwise I may end up with a situation where someone pays when they don't need to...

    if (ctx.state.user === undefined) {
      ctx.response.status = 403;
      return "Must be a member to pay for a subscription";
    }

    const user = ctx.state.user;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "gbp",
      metadata: {
        id: user.id,
        email: user.email,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  },

  getRenewalCost: async (ctx) => {
    if (ctx.state.user === undefined) {
      ctx.response.status = 403;
      return "Must be a member to pay for a subscription";
    }

    var user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: ctx.state.user.id }, ["members"]);

    if (ctx.query.id == null) {
      ctx.response.status = 400;
      return "Must give a plan id";
    }

    const membership = await strapi
      .query("membership-detail")
      .findOne({ _id: ctx.query.id });

    if (membership == null) {
      ctx.response.status = 400;
      return "Invalid membership plan";
    }

    return strapi.config.functions["renewalCost"](user.members, membership);
  },
};
