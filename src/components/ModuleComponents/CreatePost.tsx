'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button } from '@mui/material';
import { BlogForm } from '@siddant-rachha/blog-components';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Routes } from '@/constants/globalConstants';
import { useAddUpdatePost } from '@/hooks/useAddUpdatePost';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { PostType } from '@/types/types';

export const CreatePost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    selectors: { userDetails },
  } = useAuthSlice();
  const { handleFormAddPost, handleFormUpdatePost } = useAddUpdatePost();

  const {
    selectors: { editPost },
    actions: { setEditPost },
  } = usePostsSlice();

  const [resetForm, setResetForm] = useState(false);

  const handleFormSubmit = async (formData: {
    image: File | null | string;
    title: string;
    desc: string;
  }) => {
    try {
      // if edit post
      if (editPost.id) {
        await handleFormUpdatePost({
          ...formData,
          postId: editPost.id,
        });
      } else {
        // if new post
        await handleFormAddPost({
          ...formData,
          imageFile: (formData.image as File) || null,
        });
      }
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

  useEffect(() => {
    if (pathname !== Routes['Edit Post']) {
      setEditPost({} as PostType);
      setResetForm(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === Routes['Edit Post'] && !editPost.id) {
      router.push(Routes['Home']);
    }
  }, [pathname]);

  return (
    <>
      <Box
        sx={{
          width: { md: '80%' },
          margin: 'auto',
        }}
      >
        <Button sx={{ my: 2 }} variant="outlined" onClick={() => router.back()}>
          <ArrowBackIcon /> Back
        </Button>
        <BlogForm
          handleFormSubmit={handleFormSubmit}
          name={userDetails?.displayName || 'Anonymous'}
          title={editPost.title || ''}
          desc={editPost.desc || ''}
          resetForm={resetForm}
          imageUrl={editPost.imageUrl}
        />
      </Box>
    </>
  );
};
