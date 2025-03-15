import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceNames } from '@/globalState/sliceNames';

export const commonSlice = createSlice({
  name: sliceNames.postsSlice,
  initialState: {
    rootLoading: false,
  },
  reducers: {
    setRootLoading: (state, action: PayloadAction<boolean>) => {
      state.rootLoading = action.payload;
    },
  },
});

export const commonSliceReducer = commonSlice.reducer;

export const { ...commonSliceActions } = commonSlice.actions;
