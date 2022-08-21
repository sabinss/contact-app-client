import { applyMiddleware, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
