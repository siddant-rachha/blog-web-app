import { usePostsSlice } from '@/hooks/usePostsSlice';
import { timestampToString } from '@/utils/TimestampToStringDate/timestampToString';
import { BlogPage } from '@siddant-rachha/blog-components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Typography } from '@mui/material';

export default function BlogPageView() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const {
    selectors: { readPost },
    actions: { getPostById },
  } = usePostsSlice();

  const [postNotFound, setPostNotFound] = useState(false);

  const handleGetPostById = async (postId: string) => {
    try {
      await getPostById(postId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.data?.error) setPostNotFound(true);
    }
  };

  useEffect(() => {
    if (!readPost.id && postId) {
      handleGetPostById(postId);
    }
  }, []);

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
    imageSrc: readPost.imageUrl,
    date: stringDate,
    author: readPost.author,
    avatarSrc: readPost.authorPic,
    writePermission: readPost.writePermission,
  };
  return <BlogPage blogPost={mappedPost} handleBlogAction={() => {}} />;
}
