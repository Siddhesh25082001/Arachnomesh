// Importing the requiremnts
import { combineReducers } from "redux";
import category from "./category";
import cart from "./cart";
import user from "./user";
import payment from "./payment";
import question from "./questionnaire";

//Combine All the reducers here
const rootReducer = combineReducers({
  category,
  cart,
  user,
  payment,
  question,
});

export default rootReducer;
