import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
  SET_POP_CART,
} from '../config/actionTypes';

const initialState = {
  step: 1,
  prevSteps: [],
  popCart: false,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_MENU:
      return {
        ...state,
        step: state.step + 1,
        prevSteps: [...state.prevSteps, state.step],
      };

    case PREVIOUS_MENU:
      if (state.prevSteps.length !== 0) {
        return {
          ...state,
          prevSteps: state.prevSteps.slice(0, -1),
          step: state.prevSteps[state.prevSteps.length - 1],
        };
      } else {
        return state;
      }
    case SET_MENU:
      return {
        ...state,
        prevSteps: [...state.prevSteps, state.step],
        step: action.payload,
      };
    case RESET_MENU:
      return {
        ...initialState,
      };

    case SET_POP_CART:
      return { ...state, popCart: action.payload };

    default:
      return state;
  }
};

export default menuReducer;
