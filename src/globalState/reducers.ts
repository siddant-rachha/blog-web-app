import { combineReducers } from '@reduxjs/toolkit';
import { sliceNames } from './sliceNames';
import { demoReducer } from './stateSlices/demoSlice';
import { blogNavReducer } from './stateSlices/blogNavSlice';

export const rootReducer = combineReducers({
  [sliceNames.demo]: demoReducer,
  [sliceNames.blogNav]: blogNavReducer,
});
