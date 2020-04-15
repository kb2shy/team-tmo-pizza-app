import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
} from '../config/actionTypes';

const initialState = {
  step: 1,
  prevStep: []
};

let updatedPrevStep;

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_MENU:
      updatedPrevStep = [...state.prevStep];
      updatedPrevStep.push(action.payload);
      return {
        step: state.step + 1,
        prevStep: updatedPrevStep
      };

    case PREVIOUS_MENU:
      updatedPrevStep = state.prevStep.slice(0,-1);
      const lastPrevStep = state.prevStep[state.prevStep.length-1];
     
      return {
        prevStep: updatedPrevStep,
        step: lastPrevStep,
      };
    case SET_MENU:
      updatedPrevStep = [...state.prevStep];
      updatedPrevStep.push(action.payload.prevStep);
      return {
        ...initialState,
        step: action.payload.step,
        prevStep: updatedPrevStep
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
