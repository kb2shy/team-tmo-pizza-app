import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
} from '../config/types';

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
