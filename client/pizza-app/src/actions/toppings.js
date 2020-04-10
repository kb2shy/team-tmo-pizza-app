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

//Gets array or past order ids and sets the array in the store
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

//Gets a pizza id and adds it to array in the store
export const getTotalNumberPizzas = (pizza_id) => (dispatch) => {
  dispatch({
    type: SET_PAST_PIZZAS,
    payload: pizza_id
  });
}

//Gets all pizza ids in an order
export const getNumberPizzasByOrder = (order_id) => async (dispatch) => {
  try{
    const result = await apolloClient.query({
      query: GET_PIZZAS_BY_ORDER,
      variables: {order_id},
    });

    const pizzas = result.data.getPizzaIdsByOrder;

    dispatch({
      type: SET_PAST_ORDERS,
      payload: pizzas
    });

    pizzas.map(id => {
      getTotalNumberPizzas(id);
      return null;
    })

  } catch (err) {
    console.log(err);
  }
};

// Get array of toppings of a certain type
export const getToppings = (type) => async (dispatch) => {
  try {
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