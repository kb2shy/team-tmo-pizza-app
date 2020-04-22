import {
  ADD_TOPPING,
  REMOVE_TOPPING,
  SET_PIZZA_BASE,
  ADD_BASE_PRICE,
  SET_PIZZA,
  CLEAR_PIZZA,
} from '../config/actionTypes';

const initialState = {
  name: null,
  size: { type: null },
  crust: { type: null },
  sauce: { type: null },
  toppings: {
    meats: [],
    veggies: [],
    cheeses: [],
  },
  quantity: 0,
  totalPrice: 0,
  basePrice: 0,
};

const pizzaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOPPING:
      const addTopping = { ...state.toppings };
      addTopping[action.payload.type][addTopping[action.payload.type].length] = action.payload.item;

      return { ...state, toppings: addTopping };

    case REMOVE_TOPPING:
      const removeTopping = { ...state.toppings };
      removeTopping[action.payload.type] = state.toppings[action.payload.type].filter((topping) => {
        return topping.type !== action.payload.item.type;
      });

      return { ...state, toppings: removeTopping };

    case SET_PIZZA_BASE:
      let { item, type } = action.payload;
      const newBase = { ...state };
      newBase[type] = item;

      return newBase;

    case SET_PIZZA:
      return action.payload;

    case CLEAR_PIZZA:
      initialState.toppings.meats = [];
      initialState.toppings.veggies = [];
      initialState.toppings.cheeses = [];
      return initialState;

   // case ADD_TOTAL_PRICE:
    //  return { ...state, totalPrice: action.payload };

    case ADD_BASE_PRICE:
      return { ...state, basePrice: action.payload };

    default:
      return state;
  }
};

export default pizzaReducer;
