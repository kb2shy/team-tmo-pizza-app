import { ADD_PIZZA, REMOVE_PIZZA, CLEAR_PIZZAS , UPDATE_PIZZA_QTY} from '../config/actionTypes';

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

// gets a pizza and updates its quantity value
export const updatePizzaQty = (index, qty) => (dispatch) => {  
  dispatch({
    type: UPDATE_PIZZA_QTY,
    payload: {index, qty}
  })
}