import currentUser from "./currentUser";
import events from "./events";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  currentUser,
  events,
});

export default rootReducer;
