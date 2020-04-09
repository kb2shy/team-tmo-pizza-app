import {
  AUTH_PROGRESS,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  USER_LOADED,
} from "../config/types";

import { AUTH_LOC_STORAGE } from "../config/config";

const initialState = {
  token: localStorage.getItem(AUTH_LOC_STORAGE),
  user: null,
  isAuthenticated: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload, // name, email, ...
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem(AUTH_LOC_STORAGE, payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem(AUTH_LOC_STORAGE);
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
