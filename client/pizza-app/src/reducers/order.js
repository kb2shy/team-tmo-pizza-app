import {
  ORDER_PROCESS,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from '../config/actionTypes';

const initialState = {
  processing: false,
  error: null,
  order_id: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PROCESS:
      return {
        ...initialState,
        loading: true,
        error: null,
      };
    case ORDER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        order_id: action.payload,
      };
    case ORDER_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
