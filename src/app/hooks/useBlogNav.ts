import { useDispatch, useSelector } from 'react-redux';

import { NavItem } from '@/app/constants/globalConstants';
import { AppDispatch, GlobalRootState } from '@/globalState/store';
import { setNavActive } from '@/globalState/stateSlices/blogNavSlice';

export const useBlogNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navActive = useSelector(
    (state: GlobalRootState) => state.blogNav.navActive
  );

  const navItems = useSelector(
    (state: GlobalRootState) => state.blogNav.navItems
  );

  const avatarItems = useSelector(
    (state: GlobalRootState) => state.blogNav.avatarItems
  );

  const avatarSrc = useSelector(
    (state: GlobalRootState) => state.blogNav.avatarSrc
  );

  const changeNav = (navItem: NavItem) => {
    dispatch(setNavActive(navItem));
  };

  return {
    selectors: { navActive, navItems, avatarItems, avatarSrc },
    actions: { changeNav },
  };
};
