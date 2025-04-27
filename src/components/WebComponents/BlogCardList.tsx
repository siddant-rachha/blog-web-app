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

export const BlogCardList = ({
  postsType,
}: {
  postsType: 'allPosts' | 'myPosts' | 'wishListPosts';
}) => {
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
      setMyPosts,
      setWishlistPosts,
      getWishlistPosts,
    },
    selectors: { allPosts, myPosts, wishlistPosts },
  } = usePostsSlice();

  const {
    selectors: { rootLoading },
  } = useCommonSlice();

  const {
    selectors: { userDetails, initialAuthComplete },
  } = useAuthSlice();

  useEffect(() => {
    if (postsType === 'myPosts') {
      setPosts(myPosts);
    }
    if (postsType === 'allPosts') {
      setPosts(allPosts);
    }
    if (postsType === 'wishListPosts') {
      setPosts(wishlistPosts);
    }
  }, [allPosts, myPosts]);

  const fetchPosts = async () => {
    if (postsType === 'myPosts') {
      if (!userDetails?.uid) {
        setText('Login to view your posts.');
        setMyPosts([]);
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
    }
    if (postsType === 'allPosts') {
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
    if (postsType === 'wishListPosts') {
      if (!userDetails?.uid) {
        setText('Login to view your wishlisted posts.');
        setWishlistPosts([]);
        return;
      }
      try {
        await getWishlistPosts();
        if (!wishlistPosts.length) {
          setText('No wishlists found.');
        }
      } catch (error) {
        setText('Something went wrong, please try refreshing.');
        throw error;
      }
    }
  };
  useEffect(() => {
    if (initialAuthComplete) fetchPosts();
  }, [userDetails, initialAuthComplete]);

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
          if (postsType === 'myPosts') {
            const myPosts = await getMyPosts();
            if (myPosts && !myPosts.length) {
              setText('No posts found.');
            }
          }
          if (postsType === 'allPosts') {
            const allPosts = await getAllPosts();
            if (allPosts && !allPosts.length) {
              setText('No posts found.');
            }
          }
          if (postsType === 'wishListPosts') {
            const wishlistPosts = await getWishlistPosts();
            if (wishlistPosts && !wishlistPosts.length) {
              setText('No wishlists found.');
            }
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
        if (postsType === 'myPosts') {
          getMyPosts(item === 'Newest');
        }
        if (postsType === 'allPosts') {
          getAllPosts(item === 'Newest');
        }
        if (postsType === 'wishListPosts') {
          getWishlistPosts(item === 'Newest');
        }
      }
    },
    [postsType]
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
  }, [postsType]);

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
