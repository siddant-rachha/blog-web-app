'use client';

import { blogPosts } from '@/mocks/mocks';
import { BlogList } from '@siddant-rachha/blog-components';

export const BlogCardList = () => {
  return (
    <BlogList
      blogPosts={blogPosts}
      blogFilter={['Older', 'Newest']}
      blogPerPage="3"
      paginationFilter={['3', '6', '9']}
      handleCardAction={() => {}}
      handleFilterSelect={() => {}}
    />
  );
};
