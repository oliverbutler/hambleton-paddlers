import { getInstance } from "utils/axios";

const setEvents = (events) => {
  return {
    type: "SET_EVENTS",
    payload: events,
  };
};

export default {
  setEvents,
};
