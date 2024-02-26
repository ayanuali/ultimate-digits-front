import { createStore } from "redux";
import rootReducer from "../src/services/index";

const store = createStore(rootReducer);

export default store;
