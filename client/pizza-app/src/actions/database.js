import {
  LOAD_TOPPINGS,
  LOAD_CHEESES,
  LOAD_CRUSTS,
  LOAD_SAUCES,
  LOAD_SIZES,
  SET_PAST_PIZZAS,
  SET_PAST_ORDERS,
  SET_VEGGIE_COUNT,
  SET_MEATS_COUNT,
  SET_CHEESE_COUNT,
  CLEAR_USER_HISTORY
} from "../config/actionTypes";

import {
  GET_MEAT_OPTIONS,
  GET_VEGGIE_OPTIONS,
  GET_CHEESE_OPTIONS,
  GET_CRUST_OPTIONS,
  GET_SAUCE_OPTIONS,
  GET_SIZE_OPTIONS,
  GET_CUST_ORDERS,
  GET_PIZZAS_BY_ORDER,
  GET_TOPPINGS_BY_PIZZA_ID
} from '../config/gqlDefines';

import apolloClient from '../configureApolloClient';

export const clearUserHistory = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER_HISTORY
  });
}

export const getUserHistory = (customer_id) => async (dispatch) => {
  dispatch(getOrderIds(customer_id));
}

//Gets array or past order ids and sets the array in the store
export const getOrderIds = (customer_id) => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_CUST_ORDERS,
      variables: { customer_id },
    });

    const orders = result.data.getAllOrdersByCustomer.map(item => item.order_id);

    dispatch({
      type: SET_PAST_ORDERS,
      payload: orders
    });

    for (let order_id of orders) {
      dispatch(getPizzasByOrder(order_id));
    }

  } catch (err) {
    console.log(err);
  }

  return 1;
};

//testing to get all count by order
export const getToppingsByPizzaId = (pizza_id) => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_TOPPINGS_BY_PIZZA_ID,
      variables: { pizza_id },
    });

    const veggies = result.data.getToppingsByPizzaId.veggies.map(item => item.veggie_type);
    for (let topping of veggies) {
      dispatch({
        type: SET_VEGGIE_COUNT,
        payload: topping
      });
    }

    const meats = result.data.getToppingsByPizzaId.meats.map(item => item.meat_type);
    for (let topping of meats) {
      dispatch({
        type: SET_MEATS_COUNT,
        payload: topping
      });
    }

    const cheeses = result.data.getToppingsByPizzaId.cheeses.map(item => item.cheese_type);
    for (let topping of cheeses) {
      dispatch({
        type: SET_CHEESE_COUNT,
        payload: topping
      });
    }
  } catch (err) {
    console.log(err);
  }
}

//Gets all pizza ids in an order
export const getPizzasByOrder = (order_id) => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_PIZZAS_BY_ORDER,
      variables: { order_id },
    });

    const pizzas = result.data.getAllPizzasByOrder.map(item => item.pizza_id);

    for (let pizza_id of pizzas) {
      dispatch(setPastPizzas(pizza_id));
      dispatch(getToppingsByPizzaId(pizza_id))
    }
  } catch (err) {
    console.log(err);
  }
};

//Gets a pizza id and adds it to array in the store
export const setPastPizzas = (pizza_id) => (dispatch) => {
  dispatch({
    type: SET_PAST_PIZZAS,
    payload: pizza_id
  });
}

export const getAllToppings = () => async (dispatch) => {
  dispatch(getVeggies());
  dispatch(getMeats());
  dispatch(getCheeses());
  dispatch(getCrusts());
  dispatch(getSauces());
  dispatch(getSizes());
}

export const getMeats = () => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_MEAT_OPTIONS
    });

    const results = result.data.getMeatOptions.map(item => {
      return { id: item.meat_id, type: item.meat_type, price: item.meat_price };
    })

    dispatch({
      type: LOAD_TOPPINGS,
      payload: { type: 'meats', results }
    });

  } catch (err) {
    console.log(err);
  }
};

// Get array of toppings of a certain type
export const getVeggies = () => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_VEGGIE_OPTIONS
    });

    const results = result.data.getVeggieOptions.map(item => {
      return { id: item.veggie_id, type: item.veggie_type, price: item.veggie_price };
    })

    dispatch({
      type: LOAD_TOPPINGS,
      payload: { type: 'veggies', results }
    });

  } catch (err) {
    console.log(err);
  }
};

export const getCheeses = () => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_CHEESE_OPTIONS
    });

    const cheeses = result.data.getCheeseOptions.map(item => {
      return { id: item.cheese_id, type: item.cheese_type, price: item.cheese_price };
    })

    dispatch({
      type: LOAD_CHEESES,
      payload: cheeses
    });

  } catch (err) {
    console.log(err);
  }
};

export const getCrusts = () => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_CRUST_OPTIONS
    });

    const crusts = result.data.getCrustOptions.map(item => {
      return { id: item.crust_id, type: item.crust_type };
    })

    dispatch({
      type: LOAD_CRUSTS,
      payload: crusts
    });

  } catch (err) {
    console.log(err);
  }
};

export const getSauces = () => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_SAUCE_OPTIONS
    });

    const sauces = result.data.getSauceOptions.map(item => {
      return { id: item.sauce_id, type: item.sauce_type };
    })

    dispatch({
      type: LOAD_SAUCES,
      payload: sauces
    });

  } catch (err) {
    console.log(err);
  }
};

export const getSizes = () => async (dispatch) => {
  try {
    const result = await apolloClient.query({
      query: GET_SIZE_OPTIONS
    });

    const sizes = result.data.getSizeOptions.map(item => {
      return { id: item.size_id, type: item.size_type, price: item.size_price };
    })

    dispatch({
      type: LOAD_SIZES,
      payload: sizes
    });

  } catch (err) {
    console.log(err);
  }
};
