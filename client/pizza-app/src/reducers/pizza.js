import {
    ADD_TOPPING,
    REMOVE_TOPPING,
  } from "../config/actionTypes";
  
  const initialState = {
        size: 0,
        crustType: '',
        sauce: '',
        cheese: '',
        toppings: {
            meats: [],
            veggies: []
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

        default:
            return state;
        }
    };
  
  export default pizzaReducer;
  