'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RoutesWC } from '@/constants/globalConstants';
import { useAddUpdatePost } from '@/hooks/useAddUpdatePost';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { PostType } from '@/types/types';
import { EventConsumer, RemoveEvent } from './CustomEventHanlder';

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

  const handleFormSubmit = useCallback(
    async (formData: {
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
        router.push(RoutesWC['Home']);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    if (resetForm) {
      setResetForm(false);
    }
  }, [resetForm]);

  useEffect(() => {
    if (pathname !== RoutesWC['Edit Post']) {
      setEditPost({} as PostType);
      setResetForm(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === RoutesWC['Edit Post'] && !editPost.id) {
      router.push(RoutesWC['Home']);
    }
  }, [pathname]);

  useEffect(() => {
    // register custom events
    EventConsumer('handleFormSubmitWC', handleFormSubmit);
    return () => {
      RemoveEvent('handleFormSubmitWC');
    };
  }, [editPost]);

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
        <blog-form
          name={userDetails?.displayName || 'Anonymous'}
          title={editPost.title || ''}
          desc={editPost.desc || ''}
          reset-form={JSON.stringify(resetForm)}
          image-url={editPost.imageUrl}
        />
      </Box>
    </>
  );
};
