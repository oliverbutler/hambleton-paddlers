const initialState = {
  events: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };

    default:
      return state;
  }
};

export default events;
