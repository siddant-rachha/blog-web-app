'use client';
import { Box, IconButton, Paper } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useAuthSlice } from '@/globalState/stateSlices/authSlice/useAuthSlice';
import { useEffect } from 'react';
import {
  firebaseAuth,
  firebaseUIModal,
  FirebaseUser,
  GoogleAuthProvider,
  onAuthStateChanged,
} from '@/firebase/firebaseClient';
import { useHeaderNavSlice } from '@/globalState/stateSlices/headerNavSlice/useHeaderNavSlice';

export const AuthModal = () => {
  const {
    actions: { setShowAuthContainer, setUserDetails },
    selectors: { showAuthContainer },
  } = useAuthSlice();
  const {
    actions: { setAvatarItemsAsLogin },
  } = useHeaderNavSlice();

  useEffect(() => {
    if (showAuthContainer && firebaseUIModal) {
      firebaseUIModal.start('#firebaseui-auth-container', {
        signInOptions: [GoogleAuthProvider.PROVIDER_ID],
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            const firebaseUser = authResult.user as FirebaseUser;

            const userDetails = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || '',
            };

            setUserDetails(userDetails);
            setAvatarItemsAsLogin();
            setShowAuthContainer(false);
            return false;
          },
        },
      });
    }
  }, [showAuthContainer]);

  useEffect(() => {
    // when first time application loads
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const userDetails = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
        };
        setUserDetails(userDetails);
      }
    });
    return () => unsubscribe();
  }, []);

  const renderAuthModal = showAuthContainer ? (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
      }}
      onClick={() => setShowAuthContainer(false)}
    >
      <Paper
        elevation={12}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: 3,
          minWidth: '50vw',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent accidental closing
      >
        <IconButton
          sx={{ position: 'absolute', top: 10, right: 10 }}
          onClick={() => setShowAuthContainer(false)}
        >
          <Close />
        </IconButton>
        <div id="firebaseui-auth-container"></div>
      </Paper>
    </Box>
  ) : null;

  return renderAuthModal;
};
