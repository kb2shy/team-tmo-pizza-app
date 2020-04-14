import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
} from '../config/actionTypes';

const initialState = {
  step: 1,
  prevStep: 1
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_MENU:
      return {
        step: state.step + 1,
        prevStep: action.payload
      };

    case PREVIOUS_MENU:
      return {
        step: state.prevStep,
      };
    case SET_MENU:
      return {
        ...initialState,
        step: action.payload.step,
        prevStep: action.payload.prevStep
      };
    case RESET_MENU:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default menuReducer;
