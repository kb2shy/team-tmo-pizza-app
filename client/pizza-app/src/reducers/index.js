import { combineReducers } from "redux";

import menu from "./menu";
import getUserReducer from './getUserReducer';

export default combineReducers({
  menu,
  user: getUserReducer,
});
