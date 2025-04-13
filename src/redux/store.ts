import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "./MoviesState";

const reducer = combineReducers({
  moviesState: moviesReducer,
});

const store = configureStore({ reducer });

export default store;
