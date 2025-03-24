'use client';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { Close, Google } from '@mui/icons-material';
import { useEffect } from 'react';
import {
  authChangeEventListener,
  firebaseAuth,
} from '@/firebase/firebaseClient';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { useHeaderNavSlice } from '@/hooks/useHeaderNavSlice';

export const AuthModal = () => {
  const {
    actions: {
      setShowAuthModal,
      setUserDetails,
      authSignIn,
      setInitialAuthComplete,
    },
    selectors: { showAuthModal },
  } = useAuthSlice();

  const {
    actions: { setAvatarItemsAsLogin, setAvatarItemsAsLogout },
  } = useHeaderNavSlice();

  useEffect(() => {
    // when first time application loads
    const unsubscribe = authChangeEventListener(firebaseAuth, async (user) => {
      if (user) {
        const userDetails = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
        };
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
        setUserDetails(userDetails);
        setAvatarItemsAsLogin();
      } else {
        localStorage.removeItem('token');
        setUserDetails(null);
        setAvatarItemsAsLogout();
      }
      setInitialAuthComplete();
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
          minWidth: { xs: '70vw', sm: '60vw', md: '40vw' },
          minHeight: '30vh',
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
        <Button
          style={{ padding: '0.5rem 1rem', border: '1px solid blue' }}
          onClick={() => authSignIn()}
        >
          <Google />{' '}
          <Typography fontSize={'0.7rem'} color={'warning'} mx={2}>
            Sign in with Google
          </Typography>
        </Button>
      </Paper>
    </Box>
  ) : null;

  return renderAuthModal;
};
