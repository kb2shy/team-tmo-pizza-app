import {
    LOAD_TOPPINGS,
    LOAD_CHEESES,
    LOAD_CRUSTS,
    LOAD_SAUCES,
    LOAD_SIZES,
    SET_PAST_PIZZAS,
    SET_PAST_ORDERS,
    SET_VEGGIE_COUNT,
    SET_MEATS_COUNT,
    SET_CHEESE_COUNT,
    CLEAR_USER_HISTORY
  } from "../config/actionTypes";
  
  const initialState = {
    meats: [{id: '', type: '', price: 0, count: 0}], //list from db
    veggies: [{id: '', type: '', price: 0, count: 0}],
    cheeses: [{id: '', type: '', price: 0, count: 0}],
    sizes: [{id: '', type:'', price: 0}],
    sauces: [{id: '', type:''}],
    crusts: [{id: '', type:''}],
    pastOrderIds: [],
    pastPizzaIds: []
  };
  
  const databaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TOPPINGS:
            const newToppingsListState = { ...state }
            newToppingsListState[action.payload.type] = action.payload.results.map(item => {
                return {...item, count: 0 };
            });

            return newToppingsListState;

        case LOAD_CHEESES:
            const newCheeseListState = action.payload.map(item => {
                return {...item, count: 0};
            });

            return { ...state, cheeses: newCheeseListState }
    
        case SET_PAST_ORDERS:
            return { ...state, pastOrderIds: action.payload };
        
        case SET_PAST_PIZZAS:
            const newPizzaIds = [...state.pastPizzaIds];
            newPizzaIds[newPizzaIds.length] = action.payload;

            return { ...state, pastPizzaIds: newPizzaIds };

        case SET_VEGGIE_COUNT:
            const newVeggieList = state.veggies.map(item => {
                return action.payload === item.type ? {...item, count: item.count + 1} : item;
            })

            return { ...state, veggies: newVeggieList };

        case SET_MEATS_COUNT:
            const newMeatList = state.meats.map(item => {
                return action.payload === item.type ? {...item, count: item.count + 1} : item;
            })

            return {  ...state, meats: newMeatList }

        case SET_CHEESE_COUNT:
            const newCheeseList = state.cheeses.map(item => {
                return action.payload === item.type ? {...item, count: item.count + 1} : item;
            })

            return { ...state, cheeses: newCheeseList }

        case LOAD_SIZES:
            return { ...state, sizes: action.payload }

        case LOAD_SAUCES:
            return { ...state, sauces: action.payload }

        case LOAD_CRUSTS:
            return { ...state, crusts: action.payload }

        case CLEAR_USER_HISTORY:
            const resetMeats = state.meats.map(item => {
                return { ...item, count: 0};
            })

            const resetVeggies = state.veggies.map(item => {
                return { ...item, count: 0};
            })

            const resetCheeses = state.cheeses.map(item => {
                return { ...item, count: 0};
            })
            return {
                ...state,
                meats: resetMeats, 
                veggies: resetVeggies,
                cheeses: resetCheeses,
                pastOrderIds: [],
                pastPizzaIds: []
            }
        default:
            return state;
        }
    };
  
  export default databaseReducer;
  