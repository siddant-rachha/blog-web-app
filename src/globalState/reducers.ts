import { combineReducers } from '@reduxjs/toolkit';
import { sliceNames } from './sliceNames';
import { demoReducer } from './stateSlices/demoSlice';

export const rootReducer = combineReducers({
  [sliceNames.demo]: demoReducer,
});
