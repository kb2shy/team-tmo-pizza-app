import {
  AUTH_PROGRESS,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  USER_LOADED,
} from '../config/actionTypes';

const AUTH_LOC_STORAGE_KEY = 'AuthToken';

const initialState = {
  token: localStorage.getItem(AUTH_LOC_STORAGE_KEY),
  user: null,
  isAuthenticated: false,
  loading: true,
  errors: null,
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
        errors: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem(AUTH_LOC_STORAGE_KEY, payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        errors: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        errors: payload.emailError,
      };
    case LOGIN_FAILURE:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem(AUTH_LOC_STORAGE_KEY);
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        errors: null,
      };
    case REGISTER_SUCCESS:
    default:
      return state;
  }
}
