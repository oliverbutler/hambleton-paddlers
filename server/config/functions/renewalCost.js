const _ = require("lodash");

/**
 *
 * @param {*} members - user.members normally
 * @param {*} membership - the membership details
 */
module.exports = (members, membership) => {
  // Send back some statistics

  var numAdults = 0;
  var numJuniors = 0;
  var numStudents = 0;

  // Treat them as a junior is they have a student discount
  var family = _.map(members, (val) => {
    if (val.student_discount) {
      numStudents++;
      return false;
    }
    const age = strapi.config.functions["getAge"](val.date_of_birth);

    if (age >= 18) {
      numAdults++;
      return true;
    } else {
      numJuniors++;
      return false;
    }
  });

  // 2 options, individual costs OR family (+ extras

  var individualCosts = 0;
  var familyCosts = 0;

  family.map((f) => {
    // If they're an adult, add adult price
    if (f) {
      individualCosts += membership.adult_cost;
    } else {
      individualCosts += membership.junior_cost;
    }
  });

  var familyAdultsLeft = 2;
  var familyJuniorsLeft = 4;

  // Pay the family total first
  familyCosts += membership.family_cost;
  family.map((f) => {
    if (f) {
      if (familyAdultsLeft > 0) {
        familyAdultsLeft -= 1;
      } else {
        familyCosts += membership.adult_cost;
      }
    } else {
      if (familyJuniorsLeft > 0) {
        familyJuniorsLeft -= 1;
      } else {
        familyCosts += membership.junior_cost;
      }
    }
  });

  // Family cost allows 2 adults + 4 children, fill our quota then add the rest
  return {
    individualCosts: individualCosts,
    familyCosts: familyCosts,
    cheapestCosts: Math.min(individualCosts, familyCosts),
    numAdults: numAdults,
    numJuniors: numJuniors,
    numStudents: numStudents,
  };
};
