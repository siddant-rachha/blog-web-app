import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarItem, NavItem, Routes } from '@/constants/globalConstants';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { headerNavSliceActions } from './headerNavSlice';

export const useHeaderNavSlice = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const navActive = useSelector(
    (state: GlobalRootState) => state.headerNavSlice.navActive
  );

  const avatarItems = useSelector(
    (state: GlobalRootState) => state.headerNavSlice.avatarItems
  );

  const navItems = useSelector(
    (state: GlobalRootState) => state.headerNavSlice.navItems
  );

  const changeNav = (navItem: NavItem) => {
    dispatch(headerNavSliceActions.setNavActive(navItem));
    router.push(Routes[navItem]);
  };

  const setAvatarItemsAsLogin = () => {
    dispatch(headerNavSliceActions.setAvatarItems([AvatarItem.LOGOUT]));
  };

  const setAvatarItemsAsLogout = () => {
    dispatch(headerNavSliceActions.setAvatarItems([AvatarItem.LOGIN]));
  };

  return {
    selectors: { navActive, navItems, avatarItems },
    actions: { changeNav, setAvatarItemsAsLogin, setAvatarItemsAsLogout },
  };
};
