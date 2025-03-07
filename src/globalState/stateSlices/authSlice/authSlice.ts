import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceNames } from '../../sliceNames';

export type UserDetails = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
} | null;

const authSlice = createSlice({
  name: sliceNames.authSlice,
  initialState: {
    isAuth: false,
    showAuthContainer: false,
    userDetails: null as UserDetails,
  },
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setShowAuthContainer: (state, action: PayloadAction<boolean>) => {
      state.showAuthContainer = action.payload;
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
