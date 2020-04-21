import {
  ADD_PIZZA,
  REMOVE_PIZZA,
  CLEAR_PIZZAS,
  UPDATE_PIZZA_QTY,
} from '../config/actionTypes';

const initialState = [];

/**
 * The pizzas reducer
 * @param {Array} state
 * @param {*} action
 */
const pizzasReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA:
      // console.log('pizzasReducer.js: case ADD_PIZZA: action: ', action);
      return [...state, action.payload];

    case REMOVE_PIZZA:
      return state.filter((pizza, index) => index !== action.payload);

    case CLEAR_PIZZAS:
      return [];

    case UPDATE_PIZZA_QTY:
      //      console.log('pizzasReducer: UPDATE_PIZZA_QTY: action: ', action);
      return state.map((pizza, index) => {
        if (index === action.payload.index) {
          return Object.assign({}, pizza, {
            qty: action.payload.qty,
          });
        }

        return pizza;
      });

    default:
      return state;
  }
};

export default pizzasReducer;
