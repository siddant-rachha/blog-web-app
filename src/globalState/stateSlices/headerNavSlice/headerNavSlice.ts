import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvatarItem, NavItem } from '@/constants/globalConstants';
import { sliceNames } from '@/globalState/sliceNames';

type SearchItemType = {
  id: string;
  title: string;
}[];

export const headerNavSlice = createSlice({
  name: sliceNames.headerNavSlice,
  initialState: {
    navItems: [NavItem.HOME, NavItem.CREATE_POST, NavItem.MY_POST],
    navActive: NavItem.HOME,
    avatarItems: [AvatarItem.LOGIN],
    searchItems: [] as SearchItemType,
    searchLoading: false,
  },
  reducers: {
    setNavActive: (state, action: PayloadAction<NavItem>) => {
      state.navActive = action.payload;
    },
    setAvatarItems: (state, action: PayloadAction<AvatarItem[]>) => {
      state.avatarItems = action.payload;
    },
    setSearchItems: (
      state,
      action: PayloadAction<{ id: string; title: string }[]>
    ) => {
      state.searchItems = action.payload;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload;
    },
  },
});

export const blogNavReducer = headerNavSlice.reducer;

export const { ...headerNavSliceActions } = headerNavSlice.actions;
