'use client';

import { Box } from '@mui/material';
import { BlogForm } from '@siddant-rachha/blog-components';

export const CreatePost = () => {
  return (
    <Box
      sx={{
        width: { md: '80%' },
        margin: 'auto',
      }}
    >
      <BlogForm handleFormSubmit={() => {}} />
    </Box>
  );
};
