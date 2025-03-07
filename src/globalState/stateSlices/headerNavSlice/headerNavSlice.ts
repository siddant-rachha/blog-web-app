import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvatarItem, NavItem } from '@/constants/globalConstants';
import { sliceNames } from '@/globalState/sliceNames';

export const headerNavSlice = createSlice({
  name: sliceNames.headerNavSlice,
  initialState: {
    navItems: [NavItem.HOME, NavItem.CREATE_POST, NavItem.MY_POST],
    navActive: NavItem.HOME,
    avatarItems: [AvatarItem.LOGIN],
  },
  reducers: {
    setNavActive: (state, action: PayloadAction<NavItem>) => {
      state.navActive = action.payload;
    },
    setAvatarItems: (state, action: PayloadAction<AvatarItem[]>) => {
      state.avatarItems = action.payload;
    },
  },
});

export const blogNavReducer = headerNavSlice.reducer;

export const { ...headerNavSliceActions } = headerNavSlice.actions;
