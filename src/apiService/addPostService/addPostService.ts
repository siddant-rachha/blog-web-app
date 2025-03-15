import { post } from '@/utils/apiClient';
import endpoints from '../endpoints';

interface AddPostRequest {
  title: string;
  desc: string;
  name: string;
  imageFile: File | null;
}
interface AddPostResponse {
  message: string;
  postId: string;
  error: string;
}

export const addPostService = async (formData: AddPostRequest) => {
  try {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('desc', formData.desc);
    data.append('name', formData.name);
    if (formData.imageFile) {
      data.append('image', formData.imageFile);
    }
    const response = await post<typeof data, AddPostResponse>(
      endpoints.addPostEndpoint,
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};
