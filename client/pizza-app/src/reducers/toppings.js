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
            const addTopping = { ...state.toppings };
            addTopping[addTopping.length] = action.payload.item;
        return {
            toppings: [...addTopping]
        };
  
        case REMOVE_TOPPING:
            const removeTopping = { ...state.toppings };
            removeTopping.filter(topping => {
                return topping!==action.payload.item;
            })
        return {
            toppings: [...removeTopping]
        };

        default:
            return state;
        }
    };
  
  export default toppingsReducer;
  