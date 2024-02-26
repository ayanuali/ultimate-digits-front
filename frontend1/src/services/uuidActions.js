// Action Type
export const SET_UUID = "SET_UUID";

// Action Creator
export const setUUID = (uuid) => ({
  type: SET_UUID,
  payload: uuid,
});
