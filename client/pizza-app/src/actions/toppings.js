import { 
  LOAD_TOPPINGS,
  SET_PAST_PIZZAS,
  SET_PAST_ORDERS
} from "../config/actionTypes";

import {
  GET_MEAT_OPTIONS,
  GET_VEGGIE_OPTIONS,
  GET_CUST_ORDERS,
  GET_PIZZAS_BY_ORDER
} from '../config/gqlDefines';

import apolloClient from '../configureApolloClient';

export const getTotalNumberOrders = (customer_id) => async (dispatch) => {
  try{
    const result = await apolloClient.query({
      query: GET_CUST_ORDERS,
      variables: {customer_id},
    });

    const orders = result.data.getAllOrdersByCustomer;

    dispatch({
      type: SET_PAST_ORDERS,
      payload: orders
    });



  } catch (err) {
    console.log(err);
  }
};

export const getTotalNumberPizzas = (pizza_id) => (dispatch) => {
  dispatch({
    type: SET_PAST_PIZZAS,
    payload: pizza_id
  });
}

export const getNumberPizzasByOrder = (order_id) => async (dispatch) => {
  try{
    const result = await apolloClient.query({
      query: GET_PIZZAS_BY_ORDER,
      variables: {order_id},
    });

    const pizzas = result.data.getPizzaIdsByOrder;

    pizzas.map(id => {
      getTotalNumberPizzas(id)
    })

    dispatch({
      type: SET_PAST_ORDERS,
      payload: pizzas
    });



  } catch (err) {
    console.log(err);
  }
};

export const getToppings = (type) => async (dispatch) => {
  try {
    // Get array of toppings of a certain type
    let result = '';
    if(type === 'meats') {
      result = await apolloClient.query({
        query: GET_MEAT_OPTIONS,
        variables: type,
      });
      result = result.data.getMeatOptions;

    } else {
      result = await apolloClient.query({
        query: GET_VEGGIE_OPTIONS,
        variables: type,
      });
      result = result.data.getVeggieOptions;
    }

    
    dispatch({
      type: LOAD_TOPPINGS,
      payload: { type, result }
    });

  } catch (err) {
    console.log(err);
    console.log('Database query failed');
  }
};