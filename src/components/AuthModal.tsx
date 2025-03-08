'use client';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { Close, Google } from '@mui/icons-material';
import { useAuthSlice } from '@/globalState/stateSlices/authSlice/useAuthSlice';
import { useEffect } from 'react';
import {
  authChangeEventListener,
  firebaseAuth,
} from '@/firebase/firebaseClient';
import { useHeaderNavSlice } from '@/globalState/stateSlices/headerNavSlice/useHeaderNavSlice';

export const AuthModal = () => {
  const {
    actions: { setShowAuthModal, setUserDetails, authSignIn },
    selectors: { showAuthModal },
  } = useAuthSlice();

  const {
    actions: { setAvatarItemsAsLogin, setAvatarItemsAsLogout },
  } = useHeaderNavSlice();

  useEffect(() => {
    // when first time application loads
    const unsubscribe = authChangeEventListener(firebaseAuth, (user) => {
      if (user) {
        const userDetails = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
        };
        setUserDetails(userDetails);
        setAvatarItemsAsLogin();
      } else {
        setUserDetails(null);
        setAvatarItemsAsLogout();
      }
    });

    return () => unsubscribe();
  }, []);

  const renderAuthModal = showAuthModal ? (
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
      onClick={() => setShowAuthModal(false)}
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
          onClick={() => setShowAuthModal(false)}
        >
          <Close />
        </IconButton>
        <Button style={{ padding: '1rem' }} onClick={() => authSignIn()}>
          <Google /> <Typography mx={2}>Sign in with Google</Typography>
        </Button>
      </Paper>
    </Box>
  ) : null;

  return renderAuthModal;
};
