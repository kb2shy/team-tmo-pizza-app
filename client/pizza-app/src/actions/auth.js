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

import {
  CREATE_CUSTOMER,
  GET_TOKEN_BY_CUSTOMER,
  GET_CUSTOMER_BY_TOKEN,
} from '../config/gqlDefines';

import apolloClient from '../configureApolloClient';

// Get token by customer email and password (and store to localStorage)
export const loginCustomer = ({ email, password }) => async (dispatch) => {
  // Indicate that the customer is in the process of logging in - useful for spinners
  dispatch({
    type: AUTH_PROGRESS,
  });

  try {
    // Get customer token from email and password
    const result = await apolloClient.query({
      query: GET_TOKEN_BY_CUSTOMER,
      variables: { email, password },
    });

    console.log(result);

    // Dispatch an event to store the token
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: result.data.getTokenByCustomer,
      },
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Remove customer token from localStorage
export const logoutCustomer = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Load customer email and name from the token in localStorage
// Updates the customer state
export const loadCustomer = () => async (dispatch, getState) => {
  const token = getState().auth.token;

  if (token === null) {
    dispatch({
      type: AUTH_ERROR,
    });
    return;
  }

  dispatch({
    type: AUTH_PROGRESS,
  });

  try {
    const data = await apolloClient.query({
      query: GET_CUSTOMER_BY_TOKEN,
      variables: { token },
      context: {
        headers: {
          'x-auth-token': token,
        },
      },
    });

    dispatch({
      type: AUTH_ERROR,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }

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
export const registerCustomer = ({
  first_name,
  last_name,
  email,
  phone,
  password,
}) => async (dispatch) => {
  try {
    const data = await apolloClient.mutate({
      mutation: CREATE_CUSTOMER,
      variables: { first_name, last_name, email, phone, password },
    });
    console.log(data);
  } catch (err) {
    console.error('Sever error');
    console.error(err);
  }
};
