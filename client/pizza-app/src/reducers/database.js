import {
    LOAD_TOPPINGS,
    LOAD_CHEESES,
    LOAD_CRUSTS,
    LOAD_SAUCES,
    LOAD_SIZES,
    SET_PAST_PIZZAS,
    SET_PAST_ORDERS,
    SET_VEGGIE_COUNT,
    SET_MEATS_COUNT
  } from "../config/actionTypes";
  
  const initialState = {
    meats: [{meats: '', count: 0}], //list from db
    veggies: [{veggies: '', count: 0}],
    sizes: [],
    sauces: [],
    cheeses: [],
    crusts: [],
    pastOrderIds: [],
    pastPizzaIds: []
  };
  
  const databaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TOPPINGS:
            const newToppingsListState = { ...state }
            newToppingsListState[action.payload.type] = action.payload.result.map(item => {
                const obj = {};
                obj[action.payload.type] = item
                obj.count = 0;
                return obj;
            });

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
                pastPizzaIds: newPizzaIds
            }

        case SET_VEGGIE_COUNT:
            const newVeggieList = state.veggies.map(item => {
                return action.payload === item.veggies.veggie_type ? {veggies: item.veggies, count: item.count + 1} : item;
            })

            return {
                ...state,
                veggies: newVeggieList
            }

        case SET_MEATS_COUNT:
            const newMeatList = state.meats.map(item => {
                return action.payload === item.meats.meat_type ? {meats: item.meats, count: item.count + 1} : item;
            })

            return {
                ...state,
                meats: newMeatList
            }

        case LOAD_SIZES:

            return {
                ...state,
                sizes: action.payload
            }

        case LOAD_SAUCES:

            return {
                ...state,
                sauces: action.payload
            }

        case LOAD_CHEESES:

            return {
                ...state,
                cheeses: action.payload
            }

        case LOAD_CRUSTS:

            return {
                ...state,
                crusts: action.payload
            }

        default:
            return state;
        }
    };
  
  export default databaseReducer;
  