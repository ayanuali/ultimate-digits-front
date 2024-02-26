// src/reducers/uuidReducer.js
import { SET_UUID } from "./uuidActions";

const initialState = {
  uuid: null, // Initial state with uuid set to null
};

const uuidReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UUID:
      return {
        ...state,
        uuid: action.payload, // Update the uuid in the state
      };
    default:
      return state;
  }
};

export default uuidReducer;
