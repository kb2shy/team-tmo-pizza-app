import {
  ADD_PIZZA,
  REMOVE_PIZZA,
  CLEAR_PIZZAS,
  UPDATE_PIZZA_IN_PIZZAS,
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

    case UPDATE_PIZZA_IN_PIZZAS:
      // console.log('pizzasReducer / UPDATE_PIZZA_IN_PIZZAS | ', action.payload);
      return state.map((pizza, index) => {
        if (index !== action.payload.index) {
          // console.log('this pizza is not waht we want: ', pizza);
          return pizza;
        }

        return {
          ...pizza,
          ...action.payload.pizza,
        };
      });

    default:
      return state;
  }
};

export default pizzasReducer;
