'use client';

import { useAddPost } from '@/hooks/useAddPost';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { Box } from '@mui/material';
import { BlogForm } from '@siddant-rachha/blog-components';
import { useEffect, useState } from 'react';

export const CreatePost = () => {
  const {
    selectors: { userDetails },
  } = useAuthSlice();
  const { handleFormAddPost } = useAddPost();

  const [resetForm, setResetForm] = useState(false);

  const handleFormSubmit = async (formData: {
    imageFile: File | null;
    title: string;
    desc: string;
    name: string;
  }) => {
    try {
      await handleFormAddPost(formData);
      setResetForm(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (resetForm) {
      setResetForm(true);
    }
  }, [resetForm]);

  return (
    <Box
      sx={{
        width: { md: '80%' },
        margin: 'auto',
      }}
    >
      <BlogForm
        handleFormSubmit={handleFormSubmit}
        name={userDetails?.displayName || 'Anonymous'}
        resetForm={resetForm}
      />
    </Box>
  );
};
