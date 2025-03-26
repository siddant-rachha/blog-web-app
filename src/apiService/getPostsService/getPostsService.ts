import { get } from '@/utils/apiClient';
import endpoints from '../endpoints';
import { PostType } from '@/types/types';

type AllPostsResponse = {
  posts: PostType[] | undefined;
  message: string | undefined;
  error: string | undefined;
};

type SinglePostResponse = {
  post: PostType | undefined;
  message: string | undefined;
  error: string | undefined;
};

export const getAllPostsService = async () => {
  try {
    const response = await get<AllPostsResponse>(endpoints.getPosts);
    return response;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};

export const getPostByIdService = async (id: string) => {
  try {
    const response = await get<SinglePostResponse>(endpoints.getPostById(id));
    return response;
  } catch (error) {
    console.error('Error fetching single post:', error);
    throw error;
  }
};

export const getMyPostsService = async () => {
  try {
    const response = await get<AllPostsResponse>(endpoints.myposts);
    return response;
  } catch (error) {
    console.error('Error fetching my posts:', error);
    throw error;
  }
};
