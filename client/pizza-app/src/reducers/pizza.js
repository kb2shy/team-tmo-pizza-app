import {
    ADD_TOPPING,
    REMOVE_TOPPING,
    SET_PIZZA_BASE,
    CLEAR_PIZZA
  } from "../config/actionTypes";
  
  const initialState = {
        size: 'Choose Size',
        crust: 'Choose Crust Type',
        sauce: 'Choose Sauce',
        toppings: {
            meats: [],
            veggies: [],
            cheeses: []
        },
        totalPrice: 10
  };
  
  const pizzaReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOPPING:
            const addTopping = { ...state.toppings };
            addTopping[action.payload.type][addTopping[action.payload.type].length] = action.payload.item;

            return {
                ...state,
                toppings: addTopping,
                totalPrice: state.totalPrice + action.payload.price

            };
  
        case REMOVE_TOPPING:
            
            const removeTopping = {...state.toppings};
            removeTopping[action.payload.type] = state.toppings[action.payload.type].filter(topping => {
                return topping!==action.payload.item;
            });

            return {
                ...state,
                toppings: removeTopping,
                totalPrice: state.totalPrice - action.payload.price
            };

        case SET_PIZZA_BASE:
            const newBase = { ...state }
            newBase[action.payload.type] = action.payload.value;

            return newBase;

        case CLEAR_PIZZA:
            initialState.toppings.meats = [];
            initialState.toppings.veggies = [];
            initialState.toppings.cheeses = [];
            return initialState;

        default:
            return state;
        }
    };
  
  export default pizzaReducer;
  