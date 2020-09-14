import { getInstance } from "utils/axios";

const getEvents = (events) => {
  return {
    type: "SET_EVENTS",
    payload: events,
  };
};

export default {
  getEvents,
};
