'use client';

import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import emptyImg from '@/assets/no-img.png';
import { RoutesWC } from '@/constants/globalConstants';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { useCommonSlice } from '@/hooks/useCommonSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { PostType } from '@/types/types';
import { timestampToString } from '@/utils/TimestampToStringDate/timestampToString';
import { EventConsumer, RemoveEvent } from './CustomEventHandler';

export const BlogCardList = ({ myPostsType }: { myPostsType?: boolean }) => {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [perPage, setPerPage] = useState('3');
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

  const handleCardAction = useCallback(
    async ({ id, action }: { id: string; action: string }) => {
      if (action === 'edit') {
        const post = posts.find((post) => post.id === id);
        if (post) {
          router.push(RoutesWC['Edit Post']);
          setEditPost(post);
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
          router.push(`${RoutesWC['Read Post']}?id=${post.id}`);
        }
      }
    },
    [posts]
  );

  const handleFilterSelect = useCallback(
    ({ type, item }: { type: string; item: string }) => {
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
    },
    [myPostsType]
  );

  useEffect(() => {
    if (initialAuthComplete) fetchPosts();
  }, [userDetails, initialAuthComplete]);

  useEffect(() => {
    // register custom events
    EventConsumer('handleCardActionWC', handleCardAction);
    return () => {
      RemoveEvent('handleCardActionWC');
    };
  }, [posts]);

  useEffect(() => {
    // register custom events
    EventConsumer('handleFilterSelectWC', handleFilterSelect);
    return () => {
      RemoveEvent('handleFilterSelectWC');
    };
  }, [myPostsType]);

  return (
    <>
      {!posts.length && !rootLoading && (
        <Typography variant="h6">{text}</Typography>
      )}
      {posts.length ? (
        <blog-list
          blog-posts={JSON.stringify(mappedAllPosts)}
          blog-filter={JSON.stringify(['Newest', 'Oldest'])}
          blog-per-page={perPage}
          pagination-filter={JSON.stringify(['3', '6', '9'])}
        />
      ) : (
        !text && <Typography variant="h6">Loading...</Typography>
      )}
    </>
  );
};
