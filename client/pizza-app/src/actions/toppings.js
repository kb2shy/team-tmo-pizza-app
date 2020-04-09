import { 
  ADD_TOPPING, 
  REMOVE_TOPPING,
  LOAD_TOPPINGS 
} from "../config/actionTypes";

import {
  GET_MEAT_OPTIONS,
  GET_VEGGIE_OPTIONS
} from '../config/gqlDefines';

import apolloClient from '../configureApolloClient';

export const getToppings = (type) => async (dispatch) => {
  try {
    // Get array of toppings of a certain type
    let result = '';
    if(type === 'meats') {
      result = await apolloClient.query({
        query: GET_MEAT_OPTIONS,
        variables: type,
      });
      result = result.data.getMeatOptions;
      
    } else {
      result = await apolloClient.query({
        query: GET_VEGGIE_OPTIONS,
        variables: type,
      });
      result = result.data.getVeggieOptions;
    }

    
    dispatch({
      type: LOAD_TOPPINGS,
      payload: { type, result }
    });

  } catch (err) {
    console.log(err);

    // dispatch({
    //   type: DB_CONNECTION_ERROR,
    // });
  }
};

//customer orders
export const addTopping = (type, item) => (dispatch) => {
  dispatch({
    type: ADD_TOPPING,
    payload: {type, item}
  });
};

export const removeTopping = (type, item) => (dispatch) => {
  dispatch({
    type: REMOVE_TOPPING,
    payload: {type, item}
  });
};