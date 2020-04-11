import { combineReducers } from 'redux';

import menu from './menu';
import auth from './auth';
import guest from './guest';
import database from './database';
import pizza from './pizza';
import pizzas from './pizzas';

export default combineReducers({
  menu,
  auth,
  guest,
  database,
  pizza,
  pizzas
});
