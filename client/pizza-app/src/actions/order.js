import {
  ORDER_PROCESS,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from '../config/actionTypes';

import { CREATE_GUEST_ORDER, CREATE_MEMBER_ORDER } from '../config/gqlDefines';

import apolloClient from '../configureApolloClient';

/**
 * Create an order of pizzas for a guest customer.
 * @param {object} data { guest: GuestInput, pizzas: [PizzaInput] }
 */
export const createGuestOrder = ({ guest, pizzas }) => async (
  dispatch,
  getState
) => {
  // indicate the order is in progress of being persisted
  dispatch({
    type: ORDER_PROCESS,
  });

  try {
    // trigger the create guest order resolver
    const result = await apolloClient.query({
      query: CREATE_GUEST_ORDER,
      variables: { guest, pizzas },
    });

    const order = result.data.createGuestOrder;

    if (!order) {
      throw new Error('Failed to create a guest order.');
    }

    console.log(order);

    dispatch({
      type: ORDER_SUCCESS,
      payload: order.order_id,
    });
  } catch (err) {
    console.log('Error in createGuestOrder:', err);

    dispatch({
      type: ORDER_FAILURE,
    });
  }
};

/**
 * Create an order of pizzas for a guest customer.
 * @param {object} data { pizzas: [PizzaInput] }
 */
export const createMemberOrder = ({ pizzas }) => async (dispatch, getState) => {
  // get auth token
  const token = getState().auth.token;
  if (token === null) {
    dispatch({
      type: ORDER_FAILURE,
      payload: 'Not authorized!',
    });
    return;
  }

  // indicate the order is in progress of being persisted
  dispatch({
    type: ORDER_PROCESS,
  });

  try {
    // trigger the create member order resolver
    const result = await apolloClient.query({
      query: CREATE_MEMBER_ORDER,
      variables: { pizzas },
      context: {
        headers: {
          'x-auth-token': token,
        },
      },
    });

    const order = result.data.createMemberOrder;

    if (!order) {
      throw new Error('Failed to create a member order.');
    }

    console.log(order);

    dispatch({
      type: ORDER_SUCCESS,
      payload: order.order_id,
    });
  } catch (err) {
    console.log('Error in createMemberOrder:', err);

    dispatch({
      type: ORDER_FAILURE,
      error: err.message,
    });
  }
};
