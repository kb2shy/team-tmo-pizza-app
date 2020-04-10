import { SET_GUEST } from '../config/actionTypes';

export const setGuest = (guest) => (dispatch) => {
  dispatch({
    type: SET_GUEST,
    payload: guest,
  });
};
