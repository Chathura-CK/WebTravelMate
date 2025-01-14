import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import for redux-thunk
import authReducer from './reducers/authReducer';

// Combine reducers
const reducer = combineReducers({
  auth: authReducer,
});

// Initial state
let initialState = {};

// Configure store
const store = configureStore({
  reducer, // Pass the combined reducers
  preloadedState: initialState, // Set initial state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Add thunk middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
