import { combineReducers } from 'redux';

import menu from './menu';
import auth from './auth';
import customer from './customer';
import toppings from './toppings';
import order from './order'

export default combineReducers({
  menu,
  auth,
  customer,
  toppings,
  order,
});
