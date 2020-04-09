import { combineReducers } from "redux";

import menu from "./menu";
import auth from './auth';

export default combineReducers({
  menu,
  auth,
});
