import {
    ADD_TOPPING,
    REMOVE_TOPPING
  } from "../actions/types";
  
  const initialState = {
    toppings: [],
  };
  
  const toppingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOPPING:
            const addTopping = [ ...state.toppings ];
            addTopping[addTopping.length] = action.payload;
        return {
            toppings: addTopping
        };
  
        case REMOVE_TOPPING:
            const removeTopping = state.toppings.filter(topping => {
                return topping!==action.payload;
            })
        return {
            toppings: removeTopping
        };

        default:
            return state;
        }
    };
  
  export default toppingsReducer;
  