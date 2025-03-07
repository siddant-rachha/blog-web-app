import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { authSliceActions, UserDetails } from './authSlice';
import { authSignOut } from '@/firebase/firebaseClient';
import { useHeaderNavSlice } from '../headerNavSlice/useHeaderNavSlice';

export const useAuthSlice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    actions: { setAvatarItemsAsLogout },
  } = useHeaderNavSlice();

  // selectors
  const isAuth = useSelector(
    (state: GlobalRootState) => state.authSlice.isAuth
  );
  const showAuthContainer = useSelector(
    (state: GlobalRootState) => state.authSlice.showAuthContainer
  );
  const userDetails = useSelector(
    (state: GlobalRootState) => state.authSlice.userDetails
  );
  const setAuth = (bool: boolean) => {
    dispatch(authSliceActions.setIsAuth(bool));
  };

  // actions
  const setShowAuthContainer = (bool: boolean) => {
    dispatch(authSliceActions.setShowAuthContainer(bool));
  };
  const setUserDetails = (user: UserDetails | null) => {
    dispatch(authSliceActions.setUserDetails(user));
  };

  const userSignOut = async () => {
    try {
      await authSignOut();
      dispatch(authSliceActions.setUserDetails(null));
      setAvatarItemsAsLogout();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    selectors: { userDetails, isAuth, showAuthContainer },
    actions: { setAuth, setShowAuthContainer, setUserDetails, userSignOut },
  };
};
