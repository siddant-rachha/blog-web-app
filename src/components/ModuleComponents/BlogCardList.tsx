'use client';

import { Typography } from '@mui/material';
import { BlogList } from '@siddant-rachha/blog-components';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import emptyImg from '@/assets/no-img.png';
import { Routes } from '@/constants/globalConstants';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { useCommonSlice } from '@/hooks/useCommonSlice';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { PostType } from '@/types/types';
import { timestampToString } from '@/utils/TimestampToStringDate/timestampToString';

export const BlogCardList = ({
  postsType,
}: {
  postsType: 'allPosts' | 'myPosts' | 'wishListPosts';
}) => {
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

  const [text, setText] = useState('');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [perPage, setPerPage] = useState('3');

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
  };

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
