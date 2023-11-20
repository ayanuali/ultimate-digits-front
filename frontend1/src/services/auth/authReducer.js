//AuthSlice

import { createSlice } from "@reduxjs/toolkit";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    UPDATE_USER_DETAILS
  } from './actionTypes';

const initialState = {
    loading: false,
    userInfor: {},
    userToken: null,
    error: null,
    success: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
          return {
            ...state,
            error: null
          };
        case LOGIN_SUCCESS:
          return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
            error: null
          };
        case LOGIN_FAILURE:
          return {
            ...state,
            isAuthenticated: false,
            user: null,
            error: action.payload
          };
        case LOGOUT:
          return {
            ...state,
            isAuthenticated: false,
            user: null,
            error: null
          };
        case UPDATE_USER_DETAILS:
          return {
            ...state,
            user: {
              ...state.user,
              ...action.payload
            }
          };
        default:
          return state;
      }
}

export default authReducer;