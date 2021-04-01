import currentUser from "./currentUser";
import events from "./events";
import settings from "./settings";
import membershipDetails from "./membershipDetails";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  currentUser,
  events,
  settings,
  membershipDetails,
});

export default rootReducer;
