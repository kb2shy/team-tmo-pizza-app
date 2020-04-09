import { combineReducers } from 'redux';

import menu from './menu';
import auth from './auth';
import customer from './customer';

export default combineReducers({
  menu,
  auth,
  customer,
});
