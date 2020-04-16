import { ADD_PIZZA, REMOVE_PIZZA, CLEAR_PIZZAS } from '../config/actionTypes';

const initialState = [];

/**
 * The pizzas reducer
 * @param {Array} state
 * @param {*} action
 */
const pizzasReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA:
      /*
      commenting out old line
      this added the new pizza to the beginning of the list of pizzas
      Changed to put new pizza at the end of the list of pizzas
      */
      // return [action.payload, ...state];
      return [...state, action.payload];
    case REMOVE_PIZZA:
      return state.filter((pizza, index) => index !== action.payload);
    case CLEAR_PIZZAS:
      return [];
    default:
      return state;
  }
};

export default pizzasReducer;
