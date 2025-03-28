import { UpdatePostFormType } from '@/types/types';
import { post } from '@/utils/apiClient';
import endpoints from '../endpoints';

type UpdatePostRequest = UpdatePostFormType;
interface UpdatePostResponse {
  message: string | undefined;
  postId: string | undefined;
  error: string | undefined;
}

export const updatePostService = async (formData: UpdatePostRequest) => {
  try {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('desc', formData.desc);
    if (formData.image) {
      data.append('image', formData.image);
    }
    const response = await post<typeof data, UpdatePostResponse>(
      endpoints.updatePostById(formData.postId),
      data,
      { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 15000 }
    );
    return response;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};
