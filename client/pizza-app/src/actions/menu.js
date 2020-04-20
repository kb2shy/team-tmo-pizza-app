import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
  SET_POP_CART,
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

// const StepMenu = (props) => {
//   return function setMenu(step, prevStep) {
//     return (dispatch) => {
//       dispatch({
//         type: SET_MENU,
//         payload: { step: step, prevStep: prevStep },
//       });
//     };
//   }
// }
