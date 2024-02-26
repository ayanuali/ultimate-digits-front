import { combineReducers } from "redux";
import uuidReducer from "./uuidReducer";

const rootReducer = combineReducers({
  uuid: uuidReducer,
});

export default rootReducer;
