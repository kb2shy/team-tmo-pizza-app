import { SET_CUSTOMER_EMAIL } from '../config/actionTypes';

const initialState = {
  email: '',
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
