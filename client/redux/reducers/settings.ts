const initialState = {
  liveChat: false,
  membership: false,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        liveChat: action.payload.live_chat,
        membership: action.payload.membership,
      };

    default:
      return state;
  }
};

export default settings;
