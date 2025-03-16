import { get } from '@/utils/apiClient';
import endpoints from '../endpoints';

type PostsResponse = {
  posts: {
    id: string;
    title: string;
    desc: string;
    name: string;
    imageUrl: string;
  }[];
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPostsService = async (id?: string) => {
  try {
    const response = await get<PostsResponse>(endpoints.getPosts);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
