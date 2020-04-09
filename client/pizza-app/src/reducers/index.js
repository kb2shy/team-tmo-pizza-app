import { combineReducers } from "redux";

import menu from "./menu";
import toppings from "./toppings";

export default combineReducers({
  menu,
  toppings,
});
