import {
  ADD_PIZZA,
  REMOVE_PIZZA,
  CLEAR_PIZZAS,
  UPDATE_PIZZA_QUANTITY,
  UPDATE_PIZZA_TOTAL_PRICE
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

    case UPDATE_PIZZA_QUANTITY:
      return state.map((pizza, index) => {
        if (index === action.payload.index) {
          return Object.assign({}, pizza, {
            quantity: action.payload.quantity,
          });
        }

        return pizza;
      });

      case UPDATE_PIZZA_TOTAL_PRICE:
        return state.map((pizza, index) => {
          if (index === action.payload.index) {
            return Object.assign({}, pizza, {
              totalPrice: action.payload.totalPrice
            });
          }
          return pizza;
        });

    default:
      return state;
  }
};

export default pizzasReducer;
