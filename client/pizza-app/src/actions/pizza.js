import {
  ADD_TOPPING,
  REMOVE_TOPPING,
  SET_PIZZA_BASE,
  ADD_BASE_PRICE,
  ADD_TOTAL_PRICE,
  SET_PIZZA,
  CLEAR_PIZZA,
} from '../config/actionTypes';

//customer orders
export const addTopping = (type, item, price) => (dispatch) => {
  dispatch({
    type: ADD_TOPPING,
    payload: { type, item },
  });
};

export const removeTopping = (type, item, price) => (dispatch) => {
  dispatch({
    type: REMOVE_TOPPING,
    payload: { type, item },
  });
};

export const setBase = (type, item) => (dispatch) => {
  dispatch({
    type: SET_PIZZA_BASE,
    payload: { type, item },
  });
};

// price of pizza size + toppings
export const addBasePrice = (price) => (dispatch) => {
  // console.log(`actions/pizza: dispatching addBasePrice(${price})`)
  dispatch({
    type: ADD_BASE_PRICE,
    payload: price,
  });
};

// price of pizza quantity * base price
export const addTotalPrice = (price) => (dispatch) => {
  // console.log(`actions/pizza: dispatching addTotalPrice(${price})`)
  dispatch({
    type: ADD_TOTAL_PRICE,
    payload: price,
  });
};

export const setPizza = (pizza) => (dispatch) => {
  dispatch({
    type: SET_PIZZA,
    payload: pizza,
  });
};

export const clearPizza = () => (dispatch) => {
  dispatch({
    type: CLEAR_PIZZA,
  });
};
