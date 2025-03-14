'use client';

import { useAddPost } from '@/hooks/useAddPost';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { Box } from '@mui/material';
import { BlogForm } from '@siddant-rachha/blog-components';

export const CreatePost = () => {
  const {
    selectors: { userDetails },
  } = useAuthSlice();
  const { handleFormAddPost } = useAddPost();

  return (
    <Box
      sx={{
        width: { md: '80%' },
        margin: 'auto',
      }}
    >
      <BlogForm
        handleFormSubmit={handleFormAddPost}
        name={userDetails?.displayName || 'Anonymous'}
      />
    </Box>
  );
};
