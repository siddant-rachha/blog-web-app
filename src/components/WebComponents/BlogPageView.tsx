'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import emptyImg from '@/assets/no-img.png';
import { RoutesWC } from '@/constants/globalConstants';
import { usePostsSlice } from '@/hooks/usePostsSlice';
import { PostType } from '@/types/types';
import { timestampToString } from '@/utils/TimestampToStringDate/timestampToString';
import { EventConsumer, RemoveEvent } from './CustomEventHandler';

export default function BlogPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const {
    selectors: { readPost },
    actions: { getPostById, setEditPost, handleDeletePost, setReadPost },
  } = usePostsSlice();

  const [postNotFound, setPostNotFound] = useState(false);

  const handleGetPostById = async (postId: string) => {
    try {
      await getPostById(postId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.data?.error === 'POST_NOT_FOUND')
        setPostNotFound(true);
    }
  };

  const handleBlogAction = useCallback(
    async (action: 'edit' | 'del') => {
      if (action === 'edit') {
        if (readPost.id) {
          setEditPost(readPost);
          router.push(RoutesWC['Edit Post']);
        }
      }
      if (action === 'del') {
        if (readPost.id) {
          await handleDeletePost(readPost.id);
          router.push(RoutesWC['Home']);
        }
      }
    },
    [readPost]
  );

  useEffect(() => {
    if (postId) {
      handleGetPostById(postId);
    }
  }, [postId]);

  useEffect(() => {
    return () => {
      setReadPost({} as PostType);
    };
  }, []);

  useEffect(() => {
    // register custom events
    EventConsumer('handleBlogActionWC', handleBlogAction);
    return () => {
      RemoveEvent('handleBlogActionWC');
    };
  }, [readPost]);

  if (postNotFound) {
    return <Typography variant="h6">Post not found</Typography>;
  }

  // fix the type
  const createdAt = readPost.createdAt as unknown as {
    _seconds: number;
    _nanoseconds: number;
  };

  let stringDate = '';
  if (createdAt) {
    stringDate = timestampToString(createdAt._seconds, createdAt._nanoseconds);
  }

  const mappedPost = {
    title: readPost.title,
    desc: readPost.desc,
    imageSrc: readPost.imageUrl || emptyImg.src,
    date: stringDate,
    author: readPost.author,
    avatarSrc: readPost.authorPic,
    writePermission: readPost.writePermission,
  };
  return (
    <>
      {readPost.id ? (
        <>
          <Button
            sx={{ my: 2 }}
            variant="outlined"
            onClick={() => router.back()}
          >
            <ArrowBackIcon /> Back
          </Button>
          <blog-page blog-post={JSON.stringify(mappedPost)} />
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </>
  );
}
