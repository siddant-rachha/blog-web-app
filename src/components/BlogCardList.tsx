'use client';

import { useCommonSlice } from '@/hooks/useCommonSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { timestampToString } from '@/utils/TimestampToStringDate/timestampToString';
import { Typography } from '@mui/material';
import { BlogList } from '@siddant-rachha/blog-components';
import { useEffect, useMemo, useState } from 'react';

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

  const updatedAllPosts = useMemo(
    () =>
      allPosts.map((post) => {
        // fix the type
        const createdAt = post.createdAt as unknown as {
          _seconds: number;
          _nanoseconds: number;
        };
        return {
          ...post,
          avatarSrc: post.authorPic,
          imgSrc: post.imageUrl,
          date: timestampToString(createdAt._seconds, createdAt._nanoseconds),
        };
      }),
    [allPosts]
  );

  console.log(updatedAllPosts, 'updatedAllPosts');

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {!allPosts.length && !rootLoading && (
        <Typography variant="h6">{text}</Typography>
      )}
      <BlogList
        blogPosts={updatedAllPosts}
        blogFilter={['Older', 'Newest']}
        blogPerPage="3"
        paginationFilter={['3', '6', '9']}
        handleCardAction={() => {}}
        handleFilterSelect={() => {}}
      />
    </>
  );
};
