"use strict";
const stripe = require("stripe")(
  "sk_test_51I1xqtARo26zQ4U3021tGL3fBrmPJwlaGCH2ArUemjYhhbVAXQdNcRmq5SPNopuCmm31t1mNS3zLCVy856RK4wXY008Fo6IbiS"
);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  createPaymentIntent: async (ctx) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "gbp",
    });

    return { clientSecret: paymentIntent.client_secret };
  },
};
