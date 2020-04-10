import { ADD_PIZZA, REMOVE_PIZZA, CLEAR_PIZZAS } from '../config/actionTypes';

const initialState = [];

/**
 * The pizzas reducer
 * @param {Array} state
 * @param {*} action
 */
const pizzaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA:
      return [action.payload, ...state];
    case REMOVE_PIZZA:
      return state.filter((pizza, index) => index !== action.payload);
    case CLEAR_PIZZAS:
      return [];
    default:
      return state;
  }
};

export default pizzaReducer;
