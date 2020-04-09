import {
    ADD_TOPPING,
    REMOVE_TOPPING
  } from "../config/actionTypes";
  
  const initialState = {
    meats: [],
    veggies: []
  };
  
  const toppingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOPPING:
            const addTopping = { ...state };
            addTopping[action.payload.type][addTopping[action.payload.type].length] = action.payload.item;
        return {
            ...addTopping
        };
  
        case REMOVE_TOPPING:
            const removeTopping = state[action.payload.type].filter(topping => {
                return topping!==action.payload.item;
            })

            const newState = {...state};
            newState[action.payload.type] = removeTopping;
        return {
            ...newState
        };

        default:
            return state;
        }
    };
  
  export default toppingsReducer;
  