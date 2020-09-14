"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Every day at 00:01 check if every user is a member, and edit them accordingly
   */
  "1 0 * * *": async () => {
    const members = await strapi
      .query("user", "users-permissions")
      .model.find({ member: true });

    var today = new Date();

    members.forEach((member) => {
      var member = false;
      member.payments.forEach((payment) => {
        if (new Date(payment.ref.date_end) > today) {
          member = true;
        }
      });
      strapi
        .query("user", "users-permissions")
        .update({ id: member.id }, { member: member });
    });
  },
};
