import {
    ADD_TOPPING,
    REMOVE_TOPPING,
    LOAD_TOPPINGS,
    SET_TOTAL_PIZZAS
  } from "../config/actionTypes";
  
  const initialState = {
    meats: [], //on customer order
    veggies: [], 
    allMeats: [], //list from db
    allVeggies: [],
    pizzaCount: 0
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

        case LOAD_TOPPINGS:
            const newToppingsListState = { ...state }
            const arrayName = action.payload.type === 'meats' ? 'allMeats' : 'allVeggies';

            newToppingsListState[arrayName] = action.payload.result;
        return {
            ...newToppingsListState
        }
        
        case SET_TOTAL_PIZZAS:
            return {
                ...state,
                pizzaCount: action.payload
            }

        default:
            return state;
        }
    };
  
  export default toppingsReducer;
  