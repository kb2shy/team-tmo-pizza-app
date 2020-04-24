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
  UPDATE_OR_CREATE_CUSTOMER,
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

    const token = result.data.getTokenByCustomer;
    if (token !== null) {
      // Store the token
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
        },
      });

      // Load `user` from token (if token is null, sets `user` to null)
      dispatch(loadCustomer());
    } else {
      dispatch({
        type: LOGIN_FAILURE,
      });
    }
  } catch (err) {
    console.log('Error in loginCustomer:', err);

    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

// Remove customer token from localStorage
export const logoutCustomer = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Load customer email, name, and other info from the token in localStorage
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
    const result = await apolloClient.query({
      query: GET_CUSTOMER_BY_TOKEN,
      context: {
        headers: {
          'x-auth-token': token,
        },
      },
    });

    const customer = result.data.getCustomerByToken;
    dispatch({
      type: USER_LOADED,
      payload: customer,
    });
  } catch (err) {
    console.log('Error in loadCustomer:', err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const registerCustomer = ({
  first_name,
  last_name,
  email,
  phone,
  password,
}) => async (dispatch) => {
  // Indicate that the customer is in the process of registering
  dispatch({
    type: AUTH_PROGRESS,
  });

  try {
    const result = await apolloClient.mutate({
      mutation: UPDATE_OR_CREATE_CUSTOMER,
      variables: {
        first_name,
        last_name,
        email,
        phone,
        password,
        registered: true,
      },
    });

    const customer = result.data.updateOrCreateCustomer;
    if (customer) {
      // dispatch success
      dispatch({
        type: REGISTER_SUCCESS,
      });

      // get token
      dispatch(
        loginCustomer({
          email: customer.email,
          password,
        })
      );
    } else {
      dispatch({
        type: REGISTER_FAILURE,
        payload: {
          emailError: `There's already a registered account that is associated with this email`,
        },
      });
    }
  } catch (err) {
    console.log('Error in registerCustomer:', err);
    dispatch({
      type: REGISTER_FAILURE,
      payload: {
        emailError: `There's already a registered account that is associated with this email`,
      },
    });
  }
};
