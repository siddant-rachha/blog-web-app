'use client';

import { useCommonSlice } from '@/hooks/useCommonSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { Typography } from '@mui/material';
import { BlogList } from '@siddant-rachha/blog-components';
import { useEffect, useState } from 'react';

export const BlogCardList = () => {
  const {
    actions: { getAllPosts },
    selectors: { allPosts },
  } = usePostsSlice();

  const {
    selectors: { rootLoading },
  } = useCommonSlice();

  const [text, setText] = useState('');

  const fetchPosts = async () => {
    try {
      await getAllPosts();
      if (!allPosts.length) {
        setText('No posts found.');
      }
    } catch (error) {
      setText('Something went wrong, please try refreshing.');
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {!allPosts.length && !rootLoading && (
        <Typography variant="h6">{text}</Typography>
      )}
      <BlogList
        blogPosts={allPosts}
        blogFilter={['Older', 'Newest']}
        blogPerPage="3"
        paginationFilter={['3', '6', '9']}
        handleCardAction={() => {}}
        handleFilterSelect={() => {}}
      />
    </>
  );
};
