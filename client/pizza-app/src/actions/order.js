import {
  ORDER_PROCESS,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from '../config/actionTypes';

import { CREATE_GUEST_ORDER, CREATE_MEMBER_ORDER } from '../config/gqlDefines';

import apolloClient from '../configureApolloClient';

export const makeGuestOrder = ({ guest, pizzas }) => (dispatch, getState) => {
  // indicate the order is in progress of being persisted
  dispatch({
    type: ORDER_PROCESS,
  });

  //
};
