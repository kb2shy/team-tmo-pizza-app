import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
  SET_POP_CART,
} from '../config/actionTypes';

export const nextMenu = (prevStep) => (dispatch) => {
  dispatch({
    type: NEXT_MENU,
    payload: prevStep
  });
};

export const previousMenu = () => (dispatch) => {
  dispatch({
    type: PREVIOUS_MENU
  });
};

export const setMenu = (step, prevStep) => (dispatch) => {
  dispatch({
    type: SET_MENU,
    payload: {step: step, prevStep: prevStep},
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
    payload: state
  });
};
