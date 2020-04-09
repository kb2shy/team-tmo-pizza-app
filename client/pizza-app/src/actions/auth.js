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
import setAuthToken from "../utils/setAuthToken";

// Load user from token in local storage
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: AUTH_PROGRESS,
  });

  setAuthToken(localStorage.getItem(AUTH_LOC_STORAGE));

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const registerUser = (
  { name, email, password, recaptchaValue },
  clearAlerts
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, recaptchaValue });

  dispatch({
    type: AUTH_PROGRESS,
  });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, // token
    });

    dispatch(loadUser());

    dispatch(sendEmailToVerifyAccount(false)); // send verification

    if (clearAlerts) {
      dispatch(removeAllAlerts());
    }

    dispatch(
      setAlert(`Welcome to AstroClimb, ${res.data.user.name}`, "success")
    );
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        if (clearAlerts) {
          dispatch(removeAllAlerts());
        }
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }

    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

// Login user
export const loginUser = ({ email, password }, clearAlerts) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  dispatch({
    type: AUTH_PROGRESS,
  });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, // token
    });

    dispatch(loadUser());

    if (clearAlerts) {
      dispatch(removeAllAlerts());
    }

    dispatch(setAlert(`Welcome, ${res.data.user.name}!`, "success"));
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        if (clearAlerts) {
          dispatch(removeAllAlerts());
        }
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }

    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

// Logout / Clear Profile
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert("You have been logged out!", "success"));
};
