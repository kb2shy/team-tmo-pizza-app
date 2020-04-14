import { ADD_PIZZA, REMOVE_PIZZA, CLEAR_PIZZAS } from '../config/actionTypes';

export const addPizza = (pizza) => (dispatch) => {
  dispatch({
    type: ADD_PIZZA,
    payload: pizza,
  });
};

export const removePizza = (index) => (dispatch) => {
  dispatch({
    type: REMOVE_PIZZA,
    payload: index,
  });
};

export const clearPizzas = () => (dispatch) => {
  dispatch({
    type: CLEAR_PIZZAS,
  });
};




