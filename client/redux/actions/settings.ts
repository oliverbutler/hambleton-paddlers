const setSettings = (settings: {}) => {
  return {
    type: "SET_SETTINGS",
    payload: settings
  };
};

export default {
  setSettings,
};
