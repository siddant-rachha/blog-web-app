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

export const BlogCardList = ({ myPostsType }: { myPostsType?: boolean }) => {
  const router = useRouter();
  const {
    actions: {
      getAllPosts,
      setEditPost,
      handleDeletePost,
      setReadPost,
      getMyPosts,
    },
    selectors: { allPosts, myPosts },
  } = usePostsSlice();

  const {
    selectors: { rootLoading },
  } = useCommonSlice();

  const {
    selectors: { userDetails, initialAuthComplete },
  } = useAuthSlice();

  const [text, setText] = useState('');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [perPage, setPerPage] = useState('3');

  useEffect(() => {
    if (myPostsType) {
      setPosts(myPosts);
    } else {
      setPosts(allPosts);
    }
  }, [allPosts, myPosts]);

  useEffect(() => {
    if (myPostsType) getMyPosts();
  }, [userDetails]);

  const fetchPosts = async () => {
    if (myPostsType) {
      if (!userDetails) {
        setText('Login to view your posts.');
        return;
      }
      try {
        const myPosts = await getMyPosts();
        if (myPosts && !myPosts.length) {
          setText('No posts found.');
        }
      } catch (error) {
        setText('Something went wrong, please try refreshing.');
        throw error;
      }
    } else {
      try {
        await getAllPosts();
        if (!allPosts.length) {
          setText('No posts found.');
        }
      } catch (error) {
        setText('Something went wrong, please try refreshing.');
        throw error;
      }
    }
  };

  const mappedAllPosts = useMemo(
    () =>
      posts.map((post) => {
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
    [posts]
  );

  const handleCardAction = async ({
    id,
    action,
  }: {
    id: string;
    action: string;
  }) => {
    if (action === 'edit') {
      const post = posts.find((post) => post.id === id);
      if (post) {
        setEditPost(post);
        router.push(Routes['Edit Post']);
      }
    }
    if (action === 'del') {
      const post = posts.find((post) => post.id === id);
      if (post) {
        await handleDeletePost(post.id);
        if (myPostsType) {
          const myPosts = await getMyPosts();
          if (myPosts && !myPosts.length) {
            setText('No posts found.');
          }
        } else {
          await getAllPosts();
        }
      }
    }
    if (action === 'read') {
      const post = posts.find((post) => post.id === id);
      if (post) {
        setReadPost({} as PostType);
        router.push(`${Routes['Read Post']}?id=${post.id}`);
      }
    }
  };

  const handleFilterSelect = ({
    type,
    item,
  }: {
    type: string;
    item: string;
  }) => {
    if (type === 'Per page') {
      setPerPage(item);
    }
    if (type === 'Filter by') {
      if (myPostsType) {
        getMyPosts(item === 'Newest');
      } else {
        getAllPosts(item === 'Newest');
      }
    }
  };

  useEffect(() => {
    if (initialAuthComplete) fetchPosts();
  }, [userDetails, initialAuthComplete]);

  return (
    <>
      {!posts.length && !rootLoading && (
        <Typography variant="h6">{text}</Typography>
      )}
      {posts.length ? (
        <BlogList
          blogPosts={mappedAllPosts}
          blogFilter={['Newest', 'Oldest']}
          blogPerPage={perPage}
          paginationFilter={['3', '6', '9']}
          handleCardAction={handleCardAction}
          handleFilterSelect={handleFilterSelect}
        />
      ) : (
        !text && <Typography variant="h6">Loading...</Typography>
      )}
    </>
  );
};
