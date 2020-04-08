import { ADD_TOPPING, REMOVE_TOPPING } from "./types";

export const addTopping = (item) => (dispatch) => {
  dispatch({
    type: ADD_TOPPING,
    payload: item
  });
};

export const removeTopping = (item) => (dispatch) => {
  dispatch({
    type: REMOVE_TOPPING,
    payload: item
  });
};