import { ADD_TOPPING, REMOVE_TOPPING } from "../config/actionTypes";

export const addTopping = (type, item) => (dispatch) => {
  dispatch({
    type: ADD_TOPPING,
    payload: {type, item}
  });
};

export const removeTopping = (type, item) => (dispatch) => {
  dispatch({
    type: REMOVE_TOPPING,
    payload: {type, item}
  });
};