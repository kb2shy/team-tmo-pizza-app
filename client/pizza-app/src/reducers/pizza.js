import {
    ADD_TOPPING,
    REMOVE_TOPPING,
    SET_PIZZA_BASE,
    CLEAR_PIZZA
  } from "../config/actionTypes";
  
  const initialState = {
        size: '',
        crust: '',
        sauce: '',
        toppings: {
            meats: [],
            veggies: [],
            cheeses: []
        },
  };
  
  const pizzaReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOPPING:
            const addTopping = { ...state.toppings };
            addTopping[action.payload.type][addTopping[action.payload.type].length] = action.payload.item;

            return {
                ...state,
                toppings: addTopping
            };
  
        case REMOVE_TOPPING:
            
            const removeTopping = {...state.toppings};
            removeTopping[action.payload.type] = state.toppings[action.payload.type].filter(topping => {
                return topping!==action.payload.item;
            });

            return {
                ...state,
                toppings: removeTopping
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
  