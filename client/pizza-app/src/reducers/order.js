import {
  ORDER_PROCESS,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from '../config/actionTypes';

const initialState = {
  processing: false,
  errors: null,
  order_id: null,
  code: null,
  created_at: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PROCESS:
      return {
        ...state,
        processing: true,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        processing: false,
        error: null,
        order_id: action.payload.order.order_id,
        code: action.payload.code,
        created_at: action.payload.order.created_at,
      };
    case ORDER_FAILURE:
      return {
        ...initialState,
        errors: action.payload.emailError,
      };
    default:
      return state;
  }
};

export default orderReducer;
