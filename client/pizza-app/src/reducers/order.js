import {
  ORDER_PROCESS,
  ORDER_SUCCESS,
  ORDER_FAILURE,
  CLEAR_ORDER,
} from '../config/actionTypes';

const initialState = {
  processing: false,
  errors: null,
  order_id: null,
  code: null,
  codeBuffer: null,
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
        errors: null,
        order_id: action.payload.order.order_id,
        code: action.payload.code,
        codeBuffer: new Buffer(action.payload.codeBuffer, 'base64'),
        created_at: action.payload.order.created_at,
      };
    case ORDER_FAILURE:
      return {
        ...initialState,
        errors: action.payload.emailError,
      };
    case CLEAR_ORDER:
      return initialState;
    default:
      return state;
  }
};

export default orderReducer;
