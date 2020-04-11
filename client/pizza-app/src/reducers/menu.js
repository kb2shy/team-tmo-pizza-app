import {
  NEXT_MENU,
  PREVIOUS_MENU,
  SET_MENU,
  RESET_MENU,
} from '../config/actionTypes';

const initialState = {
  step: 1,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_MENU:
      return {
        step: state.step + 1,
      };

    case PREVIOUS_MENU:
      return {
        step: Math.max(state.step - 1, 1),
      };
    case SET_MENU:
      return {
        ...initialState,
        step: action.payload,
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
