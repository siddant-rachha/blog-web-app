import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceNames } from '../sliceNames';
import { AvatarItem, NavItem } from '@/constants/globalConstants';

export const blogNavSlice = createSlice({
  name: sliceNames.blogNav,
  initialState: {
    navItems: [NavItem.HOME, NavItem.CREATE_POST],
    navActive: NavItem.HOME,
    avatarSrc: '',
    avatarItems: [AvatarItem.LOGIN],
  },
  reducers: {
    setNavActive: (state, action: PayloadAction<NavItem>) => {
      state.navActive = action.payload;
    },
  },
});

export const blogNavReducer = blogNavSlice.reducer;

export const { setNavActive } = blogNavSlice.actions;
