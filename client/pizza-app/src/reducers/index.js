import { combineReducers } from 'redux';

import menu from './menu';
import auth from './auth';
import guest from './guest';
import toppings from './toppings';
import pizza from './pizza';
import pizzas from './pizzas';

export default combineReducers({
  menu,
  auth,
  guest,
  toppings,
  pizza,
  pizzas
});
