import { combineReducers } from 'redux';

import menu from './menu';
import auth from './auth';
import customer from './customer';
import toppings from './toppings';
import pizza from './pizza';

export default combineReducers({
  menu,
  auth,
  customer,
  toppings,
  pizza,
});
