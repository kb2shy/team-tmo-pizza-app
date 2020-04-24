import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
  CLEAR_PREVIOUS_MENU,
  SET_POP_CART,
  SET_SIZE_QNTY_PROMPT
} from '../config/actionTypes';

export const nextMenu = () => (dispatch) => {
  dispatch({
    type: NEXT_MENU,
  });
};

export const previousMenu = () => (dispatch) => {
  dispatch({
    type: PREVIOUS_MENU,
  });
};

export const clearPreviousMenu = () => (dispatch) => {
  dispatch({
    type: CLEAR_PREVIOUS_MENU,
  });
};

export const setMenu = (step) => (dispatch) => {
  dispatch({
    type: SET_MENU,
    payload: step,
  });
};

export const resetMenu = () => (dispatch) => {
  dispatch({
    type: RESET_MENU,
  });
};

export const setPopCart = (state) => (dispatch) => {
  dispatch({
    type: SET_POP_CART,
    payload: state,
  });
};

