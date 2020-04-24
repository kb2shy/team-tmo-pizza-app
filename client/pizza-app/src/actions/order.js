import {
  ORDER_PROCESS,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from '../config/actionTypes';

import { CREATE_GUEST_ORDER, CREATE_MEMBER_ORDER } from '../config/gqlDefines';

import apolloClient from '../configureApolloClient';

/**
 * Create an order of pizzas for a guest customer.
 * @param {object} guest GuestInput
 * @param {*} onSuccessEvent A function to be called if the order submits successfully.
 */
export const createGuestOrder = (guest, onSuccessEvent) => async (
  dispatch,
  getState
) => {
  // convert pizza reducer to [PizzaInput]!
  // (for this to work, the PizzaInput cannot contain any
  //  additional fields that do not apply to the PizzaInput)
  const pizzasRed = getState().pizzas;
  const pizzas = [];
  for (let pizza of pizzasRed) {
    const { size, crust, sauce, toppings, quantity } = pizza;

    const sizeId = size.id;
    const crustId = crust.id;
    const sauceId = sauce.id;
    const meatsIds = toppings.meats.map((item) => item.id);
    const cheesesIds = toppings.cheeses.map((item) => item.id);
    const veggiesIds = toppings.veggies.map((item) => item.id);
    const toppingsId = {
      meats: meatsIds,
      veggies: veggiesIds,
      cheeses: cheesesIds,
    };

    pizzas.push({
      size: sizeId,
      crust: crustId,
      sauce: sauceId,
      toppings: toppingsId,
      quantity
    });
  }

  // indicate the order is in progress of being persisted
  dispatch({
    type: ORDER_PROCESS,
  });

  try {
    // trigger the create guest order resolver
    const result = await apolloClient.mutate({
      mutation: CREATE_GUEST_ORDER,
      variables: { guest, pizzas },
    });

    const order = result.data.createGuestOrder;
    console.log('RESULT: ' + order);

    if (!order) {
      throw new Error('Failed to create a guest order.');
    }

    dispatch({
      type: ORDER_SUCCESS,
      payload: order,
    });

    // trigger the user-defined callback
    if (onSuccessEvent) {
      onSuccessEvent();
    }
  } catch (err) {
    console.log('Error in createGuestOrder:', err);

    dispatch({
      type: ORDER_FAILURE,
      errors: {emailError: 'Email is already in use.' }
    });
  }
};

/**
 * Create an order of pizzas for a guest customer.
 * @param {*} onSuccessEvent A function to be called if the order submits successfully.
 */
export const createMemberOrder = (onSuccessEvent) => async (
  dispatch,
  getState
) => {
  // get auth token
  const token = getState().auth.token;
  if (token === null) {
    dispatch({
      type: ORDER_FAILURE,
      payload: 'Not authorized!',
    });
    return;
  }

  // convert pizza reducer to [PizzaInput]!
  // (for this to work, the PizzaInput cannot contain any
  //  additional fields that do not apply to the PizzaInput)
  const pizzasRed = getState().pizzas;
  const pizzas = [];
  for (let pizza of pizzasRed) {
    const { size, crust, sauce, toppings, quantity } = pizza;

    const sizeId = size.id;
    const crustId = crust.id;
    const sauceId = sauce.id;
    const meatsIds = toppings.meats.map((item) => item.id);
    const cheesesIds = toppings.cheeses.map((item) => item.id);
    const veggiesIds = toppings.veggies.map((item) => item.id);
    const toppingsId = {
      meats: meatsIds,
      veggies: veggiesIds,
      cheeses: cheesesIds,
    };

    //price hardcoded, should get added later
    pizzas.push({
      size: sizeId,
      crust: crustId,
      sauce: sauceId,
      toppings: toppingsId,
      quantity
    });
  }

  // indicate the order is in progress of being persisted
  dispatch({
    type: ORDER_PROCESS,
  });

  try {
    console.log(JSON.stringify(pizzas, null, 2));
    // trigger the create member order resolver
    const result = await apolloClient.mutate({
      mutation: CREATE_MEMBER_ORDER,
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

    dispatch({
      type: ORDER_SUCCESS,
      payload: order,
    });

    // trigger the user-defined callback
    if (onSuccessEvent) {
      onSuccessEvent();
    }
  } catch (err) {
    console.log('Error in createMemberOrder:', err);

    dispatch({
      type: ORDER_FAILURE,
      error: err.message,
    });
  }
};
