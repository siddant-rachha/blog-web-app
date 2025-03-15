'use client';

import { usePostsSlice } from '@/hooks/usePostsSlice';
import { BlogList } from '@siddant-rachha/blog-components';
import { useEffect } from 'react';

export const BlogCardList = () => {
  const {
    actions: { getAllPosts },
    selectors: { allPosts },
  } = usePostsSlice();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <BlogList
      blogPosts={allPosts}
      blogFilter={['Older', 'Newest']}
      blogPerPage="3"
      paginationFilter={['3', '6', '9']}
      handleCardAction={() => {}}
      handleFilterSelect={() => {}}
    />
  );
};
