import { post } from '@/utils/apiClient';
import endpoints from '../endpoints';

interface AddPostRequest {
  title: string;
  desc: string;
  name: string;
}
interface AddPostResponse {
  message: string;
  postId: string;
  error: string;
}

export const addPostService = async (data: AddPostRequest) => {
  try {
    const response = await post<AddPostRequest, AddPostResponse>(
      endpoints.addPostEndpoint,
      data
    );
    return response;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};
