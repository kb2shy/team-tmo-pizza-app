import {
  ADD_PIZZA,
  REMOVE_PIZZA,
  CLEAR_PIZZAS,
  UPDATE_PIZZA_IN_PIZZAS
} from '../config/actionTypes';

const initialState = [];

/**
 * The pizzas reducer
 * @param {Array} state
 * @param {*} action
 */
const pizzasReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA:
      // console.log('pizzasReducer.js: case ADD_PIZZA: action: ', action);
      return [...state, action.payload];

    case REMOVE_PIZZA:
      return state.filter((pizza, index) => index !== action.payload);

    case CLEAR_PIZZAS:
      return [];

      case UPDATE_PIZZA_IN_PIZZAS:
        console.log('pizzasReducer / UPDATE_PIZZA_IN_PIZZAS | ', action.payload)
        return state.map((pizza, index) => {
          if (index !== action.payload.index){
            console.log('this pizza is not waht we want: ', pizza)
            return pizza;
          }
          const obj = { ...pizza, ...action.payload.pizza}
          console.log('o.w. return obj = ', obj)
          return obj
          // return {
          //   ...pizza,
          //   ...action.payload.pizza
          // }
        })
    // case UPDATE_PIZZA:
    //   console.log('pizzasReducer / UPDATE_PIZZA: action: ', action.payload)
    //   return state.map((index, pizza) => {
    //     if (index === action.payload.index) {
    //       console.log ('found the index ' , index)
    //       return Object.assign({}, pizza, action.payload.pizza)
    //     }
    //     return pizza
    // //   });
    // case UPDATE_PIZZA_QUANTITY:
    //   return state.map((pizza, index) => {
    //     if (index === action.payload.index) {
    //       return Object.assign({}, pizza, {
    //         quantity: action.payload.totalPrice
    //       });
    //     }
    //     return pizza;
    //   });

    default:
      return state;
  }
};

export default pizzasReducer;
