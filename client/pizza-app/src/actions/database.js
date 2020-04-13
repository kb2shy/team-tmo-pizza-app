import { 
  LOAD_TOPPINGS,
  SET_PAST_PIZZAS,
  SET_PAST_ORDERS,
  SET_VEGGIE_COUNT,
  SET_MEATS_COUNT
} from "../config/actionTypes";

import {
  GET_MEAT_OPTIONS,
  GET_VEGGIE_OPTIONS,
  GET_CUST_ORDERS,
  GET_PIZZAS_BY_ORDER,
  GET_VEGGIES_BY_PIZZA,
  GET_MEATS_BY_PIZZA
} from '../config/gqlDefines';

import apolloClient from '../configureApolloClient';

export const getUserHistory = (customer_id) => async (dispatch) => {
  dispatch(getOrderIds(customer_id));
}

//Gets array or past order ids and sets the array in the store
export const getOrderIds = (customer_id) => async (dispatch) => {
  try{
    const result = await apolloClient.query({
      query: GET_CUST_ORDERS,
      variables: {customer_id},
    });

    const orders = result.data.getAllOrdersByCustomer.map(item => item.order_id);

    dispatch({
      type: SET_PAST_ORDERS,
      payload: orders
    });

    for(let order_id of orders) {
      dispatch(getPizzasByOrder(order_id));
    }

  } catch (err) {
    console.log(err);
  }

  return 1;
};

//Gets all pizza ids in an order
export const getPizzasByOrder = (order_id) => async (dispatch) => {
  try{
    const result = await apolloClient.query({
      query: GET_PIZZAS_BY_ORDER,
      variables: {order_id},
    });

    const pizzas = result.data.getAllPizzasByOrder.map(item => item.pizza_id);

    for(let pizza_id of pizzas) {
      dispatch(setPastPizzas(pizza_id));
      dispatch(getVeggieCount(pizza_id));
      dispatch(getMeatsCount(pizza_id));
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

export const getVeggieCount = (pizza_id) => async (dispatch) => {
  try{
    const result = await apolloClient.query({
      query: GET_VEGGIES_BY_PIZZA,
      variables: {pizza_id},
    });

    const veggies = result.data.getSelectedVeggies.map(item => item.veggie.veggie_type);
    
    for(let topping of veggies) {
      dispatch({
        type: SET_VEGGIE_COUNT,
        payload: topping
      });
    }
    

  } catch (err) {
    console.log(err);
  }
}

export const getMeatsCount = (pizza_id) => async (dispatch) => {
  try{
    const result = await apolloClient.query({
      query: GET_MEATS_BY_PIZZA,
      variables: {pizza_id},
    });

    
    const meats = result.data.getSelectedMeats.map(item => item.meat.meat_type);

    for(let topping of meats) {
      dispatch({
        type: SET_MEATS_COUNT,
        payload: topping
      });
    }

  } catch (err) {
    console.log(err);
  }
}

export const getAllToppings = () => async (dispatch) => {
  dispatch(getToppings('veggies'));
  dispatch(getToppings('meats'));
}

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
  }
};