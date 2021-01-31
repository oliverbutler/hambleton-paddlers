const initialState = {
  membershipDetails: [],
};

const membershipDetails = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MEMBERSHIP_DETAILS":
      return {
        membershipDetails: action.payload.membershipDetails
      };

    default:
      return state;
  }
};

export default membershipDetails;
