import { combineReducers } from "redux";
import authReducer from "./auth";
import contactReducer from "./contacts";

export default combineReducers({
  authReducer: authReducer,
  contactReducer: contactReducer
});
