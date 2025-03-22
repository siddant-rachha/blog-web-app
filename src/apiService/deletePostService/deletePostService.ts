import { post } from '@/utils/apiClient';
import endpoints from '../endpoints';

interface DeletePostResponse {
  message: string | undefined;
  error: string | undefined;
}

interface DeletePostRequest {
  postId: string;
}

export const deletePostService = async (postId: string) => {
  try {
    const response = await post<DeletePostRequest, DeletePostResponse>(
      endpoints.deletePost,
      { postId }
    );
    return response;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
