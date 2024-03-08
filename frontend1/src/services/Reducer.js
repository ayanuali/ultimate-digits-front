// src/redux/reducers/userReducer.js
const initialState = {
  address: "",
  rootId: "",
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        address: action.payload.address,
        rootId: action.payload.rootId,
      };
    default:
      return state;
  }
}

export default userReducer;
