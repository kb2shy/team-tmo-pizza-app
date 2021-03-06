import { SET_GUEST } from '../config/actionTypes';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
};

const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GUEST:
      const { first_name, last_name, email, phone } = action.payload;

      return {
        first_name: first_name || state.first_name,
        last_name: last_name || state.last_name,
        email: email || state.email,
        phone: phone || state.phone,
      };

    // return { // unsafe way
    //   ...state,
    //   ...action.payload
    // }

    default:
      return state;
  }
};

export default guestReducer;
