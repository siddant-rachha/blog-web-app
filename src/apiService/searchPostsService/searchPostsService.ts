import endpoints from '../endpoints';
import { post } from '@/utils/apiClient';

interface AddPostResponse {
  posts:
    | {
        id: string;
        title: string;
      }[]
    | null;
  message: string;
  error: string;
}

interface SearchPostRequest {
  query: string;
}

export const searchPostsService = async (data: SearchPostRequest) => {
  try {
    const response = await post<SearchPostRequest, AddPostResponse>(
      endpoints.searchPostsEndpoint,
      data
    );
    return response;
  } catch (error) {
    console.error('Error searching post:', error);
    throw error;
  }
};
