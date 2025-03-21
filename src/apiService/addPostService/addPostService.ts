import { post } from '@/utils/apiClient';
import endpoints from '../endpoints';
import { AddPostFormType } from '@/types/types';

type AddPostRequest = AddPostFormType;
interface AddPostResponse {
  message: string | undefined;
  postId: string | undefined;
  error: string | undefined;
}

export const addPostService = async (formData: AddPostRequest) => {
  try {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('desc', formData.desc);
    if (formData.imageFile) {
      data.append('image', formData.imageFile);
    }
    const response = await post<typeof data, AddPostResponse>(
      endpoints.addPostEndpoint,
      data,
      { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 15000 }
    );
    return response;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};
