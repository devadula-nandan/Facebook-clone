import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import postsReducer from './reducers/postsSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
