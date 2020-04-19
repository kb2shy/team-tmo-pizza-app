import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
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
