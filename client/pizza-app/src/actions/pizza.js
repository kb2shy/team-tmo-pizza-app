import { 
    ADD_TOPPING, 
    REMOVE_TOPPING,
    SET_PIZZA_BASE,
    CLEAR_PIZZA
  } from "../config/actionTypes";
  
  //customer orders
  export const addTopping = (type, item, price) => (dispatch) => {
    dispatch({
      type: ADD_TOPPING,
      payload: {type, item, price}
    });
  };
  
  export const removeTopping = (type, item, price) => (dispatch) => {
    dispatch({
      type: REMOVE_TOPPING,
      payload: {type, item, price}
    });
  };

  export const setBase = (type, value) => (dispatch) => {
    dispatch({
      type: SET_PIZZA_BASE,
      payload: {type, value}
    });
  };

  export const clearPizza = () => (dispatch) => {
    dispatch({
      type: CLEAR_PIZZA
    });
  };