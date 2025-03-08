import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { authSliceActions, UserDetails } from './authSlice';
import { useHeaderNavSlice } from '../headerNavSlice/useHeaderNavSlice';
import {
  firebaseAuth,
  firebaseSignIn,
  firebaseSignOut,
  googleAuthProvider,
} from '@/firebase/firebaseClient';

export const useAuthSlice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    actions: { setAvatarItemsAsLogout, setAvatarItemsAsLogin },
  } = useHeaderNavSlice();

  // selectors

  const showAuthModal = useSelector(
    (state: GlobalRootState) => state.authSlice.showAuthModal
  );
  const userDetails = useSelector(
    (state: GlobalRootState) => state.authSlice.userDetails
  );

  // actions
  const setShowAuthModal = (bool: boolean) => {
    dispatch(authSliceActions.setShowAuthModal(bool));
  };
  const setUserDetails = (user: UserDetails | null) => {
    dispatch(authSliceActions.setUserDetails(user));
  };

  const authSignOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
      // user details is set by authChangeEventListener
      setAvatarItemsAsLogout();
      setUserDetails(null);
    } catch (e) {
      console.error(e);
    }
  };

  const authSignIn = async () => {
    try {
      await firebaseSignIn(firebaseAuth, googleAuthProvider);
      // user details is set by authChangeEventListener
      setAvatarItemsAsLogin();
      setShowAuthModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    selectors: { userDetails, showAuthModal },
    actions: {
      setShowAuthModal,
      setUserDetails,
      authSignOut,
      authSignIn,
    },
  };
};
