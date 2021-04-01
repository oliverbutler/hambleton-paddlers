
const setMembershipDetails = (membershipDetails) => {
  return {
    type: "SET_MEMBERSHIP_DETAILS",
    payload: membershipDetails,
  };
};

export default {
  setMembershipDetails,
};
