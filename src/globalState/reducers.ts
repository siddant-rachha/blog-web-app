import { combineReducers } from '@reduxjs/toolkit';
import { sliceNames } from './sliceNames';
import { authReducer } from './stateSlices/authSlice/authSlice';
import { commonSliceReducer } from './stateSlices/commonSlice/commonSlice';
import { demoReducer } from './stateSlices/demoSlice';
import { blogNavReducer } from './stateSlices/headerNavSlice/headerNavSlice';
import { postsSliceReducer } from './stateSlices/postsSlice/postsSlice';

export const rootReducer = combineReducers({
  [sliceNames.demo]: demoReducer,
  [sliceNames.headerNavSlice]: blogNavReducer,
  [sliceNames.authSlice]: authReducer,
  [sliceNames.postsSlice]: postsSliceReducer,
  [sliceNames.commonSlice]: commonSliceReducer,
});
