import { combineReducers } from '@reduxjs/toolkit';
import { sliceNames } from './sliceNames';
import { demoReducer } from './stateSlices/demoSlice';
import { authReducer } from './stateSlices/authSlice/authSlice';
import { blogNavReducer } from './stateSlices/headerNavSlice/headerNavSlice';

export const rootReducer = combineReducers({
  [sliceNames.demo]: demoReducer,
  [sliceNames.headerNavSlice]: blogNavReducer,
  [sliceNames.authSlice]: authReducer,
});
