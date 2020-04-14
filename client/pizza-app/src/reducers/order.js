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
        processing: true,
        error: null,
        order_id: null,
      };
    case ORDER_SUCCESS:
      return {
        ...initialState,
        processing: false,
        error: null,
        order_id: action.payload,
      };
    case ORDER_FAILURE:
      return {
        ...initialState,
        processing: false,
        error: action.payload,
        order_id: null,
      };
    default:
      return state;
  }
};

export default orderReducer;
