import {
    ADD_TOPPING,
    REMOVE_TOPPING,
    SET_PIZZA_BASE,
    ADD_TOTAL_PRICE,
    CLEAR_PIZZA
  } from "../config/actionTypes";
  
  const initialState = {
        size: {type: null},
        crust: null,
        sauce: null,
        toppings: {
            meats: [],
            veggies: [],
            cheeses: []
        },
        totalPrice: 0
  };
  
  const pizzaReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOPPING:
            const addTopping = { ...state.toppings };
            addTopping[action.payload.type][addTopping[action.payload.type].length] = { type: action.payload.item, price : action.payload.price };

            return { ...state, toppings: addTopping };
  
        case REMOVE_TOPPING:
            const removeTopping = {...state.toppings};
            removeTopping[action.payload.type] = state.toppings[action.payload.type].filter(topping => {
                return topping.type !== action.payload.item;
            });

            return { ...state, toppings: removeTopping };

        case SET_PIZZA_BASE:
            let {price, item, type} = action.payload;
            const newBase = { ...state }
            newBase[type] = (type === 'size') ? { type: item, price } : item;

            return newBase;

        case CLEAR_PIZZA:
            initialState.toppings.meats = [];
            initialState.toppings.veggies = [];
            initialState.toppings.cheeses = [];
            return initialState;

        case ADD_TOTAL_PRICE:
            return { ...state, totalPrice: action.payload };

        default:
            return state;
        }
    };
  
  export default pizzaReducer;
  