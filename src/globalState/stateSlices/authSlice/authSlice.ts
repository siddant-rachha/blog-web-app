import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceNames } from '../../sliceNames';
import { UserDetails } from '@/types/types';

const authSlice = createSlice({
  name: sliceNames.authSlice,
  initialState: {
    showAuthModal: false,
    userDetails: null as UserDetails,
  },
  reducers: {
    setShowAuthModal: (state, action: PayloadAction<boolean>) => {
      state.showAuthModal = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserDetails | null>) => {
      state.userDetails = action.payload;
    },
  },
});

// export the reducer to combine with root reducer
export const authReducer = authSlice.reducer;

// export all actions functions to call
export const { ...authSliceActions } = authSlice.actions;
