import endpoints from '../endpoints';
import { post } from '@/utils/apiClient';
import { SearchedPostType } from '@/types/types';

interface SearchPostResponse {
  posts: SearchedPostType[] | undefined;
  message: string | undefined;
  error: string | undefined;
}

interface SearchPostRequest {
  query: string;
}

export const searchPostsService = async (data: SearchPostRequest) => {
  try {
    const response = await post<SearchPostRequest, SearchPostResponse>(
      endpoints.searchPostsEndpoint,
      data
    );
    return response;
  } catch (error) {
    console.error('Error searching post:', error);
    throw error;
  }
};
