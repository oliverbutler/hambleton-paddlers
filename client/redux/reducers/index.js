import currentUser from "./currentUser";
import events from "./events";
import settings from "./settings";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  currentUser,
  events,
  settings,
});

export default rootReducer;
