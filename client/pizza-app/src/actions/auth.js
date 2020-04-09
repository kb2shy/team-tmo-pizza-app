import {
  AUTH_PROGRESS,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  USER_LOADED,
} from '../config/types';

import { AUTH_LOC_STORAGE } from '../config/config';
import { CREATE_CUSTOMER } from '../config/gql';

import authClient from '../configureApolloClient';

//import setAuthToken from "../utils/setAuthToken";

// Load user from token in local storage
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: AUTH_PROGRESS,
  });

  //setAuthToken(localStorage.getItem(AUTH_LOC_STORAGE));

  // try {
  //   //const res = await axios.get("/api/auth");

  //   dispatch({
  //     type: USER_LOADED,
  //     payload: res.data,
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: AUTH_ERROR,
  //   });
  // }
};

// Register user
export const registerUser = ({
  first_name,
  last_name,
  email,
  phone,
  password,
}) => async (dispatch) => {
  try {
    const data = await authClient.mutate({
      mutation: CREATE_CUSTOMER,
      variables: {first_name,
      last_name,
      email,
      phone,
      password,
    }});
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
