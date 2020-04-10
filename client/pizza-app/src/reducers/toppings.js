import {
    LOAD_TOPPINGS,
    SET_PAST_PIZZAS,
    SET_PAST_ORDERS
  } from "../config/actionTypes";
  
  const initialState = {
    meats: [], //list from db
    veggies: [],
    pastOrderIds: [],
    pastPizzaIds: []
  };
  
  const toppingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TOPPINGS:
            const newToppingsListState = { ...state }
            newToppingsListState[action.payload.type] = action.payload.result;

            return {
                ...newToppingsListState
            }

        case SET_PAST_ORDERS:
            return {
                ...state,
                pastOrderIds: action.payload
            }
        
        case SET_PAST_PIZZAS:
            const newPizzaIds = [...state.pastPizzaIds];
            newPizzaIds[newPizzaIds.length] = action.payload;
            
            return {
                ...state,
                pizzaCount: newPizzaIds
            }

        default:
            return state;
        }
    };
  
  export default toppingsReducer;
  