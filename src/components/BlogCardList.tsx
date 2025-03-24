'use client';

import { Routes } from '@/constants/globalConstants';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { useCommonSlice } from '@/hooks/useCommonSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { timestampToString } from '@/utils/TimestampToStringDate/timestampToString';
import { Typography } from '@mui/material';
import { BlogList } from '@siddant-rachha/blog-components';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import emptyImg from '@/assets/no-img.png';
import { PostType } from '@/types/types';

export const BlogCardList = () => {
  const router = useRouter();
  const {
    actions: { getAllPosts, setEditPost, handleDeletePost, setReadPost },
    selectors: { allPosts },
  } = usePostsSlice();

  const {
    selectors: { rootLoading },
  } = useCommonSlice();

  const {
    selectors: { userDetails, initialAuthComplete },
  } = useAuthSlice();

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

  const mappedAllPosts = useMemo(
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
          imgSrc: post.imageUrl || emptyImg.src,
          date: timestampToString(createdAt._seconds, createdAt._nanoseconds),
        };
      }),
    [allPosts]
  );

  const handleCardAction = async ({
    id,
    action,
  }: {
    id: string;
    action: string;
  }) => {
    if (action === 'edit') {
      const post = allPosts.find((post) => post.id === id);
      if (post) {
        setEditPost(post);
        router.push(Routes['Edit Post']);
      }
    }
    if (action === 'del') {
      const post = allPosts.find((post) => post.id === id);
      if (post) {
        await handleDeletePost(post.id);
        await getAllPosts();
      }
    }
    if (action === 'read') {
      const post = allPosts.find((post) => post.id === id);
      if (post) {
        setReadPost({} as PostType);
        router.push(`${Routes['Read Post']}?id=${post.id}`);
      }
    }
  };

  useEffect(() => {
    if (initialAuthComplete) fetchPosts();
  }, [userDetails, initialAuthComplete]);

  return (
    <>
      {!allPosts.length && !rootLoading && (
        <Typography variant="h6">{text}</Typography>
      )}
      {allPosts.length ? (
        <BlogList
          blogPosts={mappedAllPosts}
          blogFilter={['Older', 'Newest']}
          blogPerPage="3"
          paginationFilter={['3', '6', '9']}
          handleCardAction={handleCardAction}
          handleFilterSelect={() => {}}
        />
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </>
  );
};
