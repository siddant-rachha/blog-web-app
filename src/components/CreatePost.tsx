'use client';

import { Routes } from '@/constants/globalConstants';
import { useAddPost } from '@/hooks/useAddPost';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { Box } from '@mui/material';
import { BlogForm } from '@siddant-rachha/blog-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const CreatePost = () => {
  const router = useRouter();
  const {
    selectors: { userDetails },
  } = useAuthSlice();
  const { handleFormAddPost } = useAddPost();

  const {
    selectors: { editPost },
  } = usePostsSlice();

  const [resetForm, setResetForm] = useState(false);

  const handleFormSubmit = async (formData: {
    imageFile: File | null;
    title: string;
    desc: string;
  }) => {
    try {
      // TODO: Remove after adding edit feature
      if (editPost.id) {
        alert('Feature not available yet');
        return;
      }
      await handleFormAddPost(formData);
      setResetForm(true);
      router.push(Routes['Home']);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (resetForm) {
      setResetForm(false);
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
        title={editPost.title || ''}
        desc={editPost.desc || ''}
        resetForm={resetForm}
      />
    </Box>
  );
};
