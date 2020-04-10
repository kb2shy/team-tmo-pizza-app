import {
    ADD_TOPPING,
    REMOVE_TOPPING,
    LOAD_TOPPINGS
  } from "../config/actionTypes";
  
  const initialState = {
    meats: [], //on customer order
    veggies: [], 
    allMeats: [], //list from db
    allVeggies: [],
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

            const itemTypes = action.payload.result.map(item => {
                return action.payload.type === 'meats' ? item.meat_type : item.veggie_type
            });

            newToppingsListState[arrayName] = itemTypes;
        return {
            ...newToppingsListState
        }

        default:
            return state;
        }
    };
  
  export default toppingsReducer;
  