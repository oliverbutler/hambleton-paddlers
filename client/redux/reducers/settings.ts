const initialState = {
  liveChat: false,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        liveChat: action.payload.live_chat
      };

    default:
      return state;
  }
};

export default settings;
