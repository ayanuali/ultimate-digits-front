//  Here, we’ll create actions that make asynchronous requests to the backend.

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    UPDATE_USER_DETAILS
  } from './actionTypes';
  
  // Action creators for the authentication process
  export const loginRequest = () => ({
    type: LOGIN_REQUEST
  });
  
  export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
  });
  
  export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
  });
  
  export const logout = () => ({
    type: LOGOUT
  });
  
  // Action creator for updating user details
  export const updateUserDetails = (details) => ({
    type: UPDATE_USER_DETAILS,
    payload: details
  });