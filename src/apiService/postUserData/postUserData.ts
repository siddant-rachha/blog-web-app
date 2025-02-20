import { post } from '@/utils/apiClient';
import endpoints from '../endpoints';

interface UserRequest {
  data: 'test';
}
interface UserResponse {
  response: 'test';
}

// Sample Function to fetch user data by ID
export const postUserData = async (id: string) => {
  try {
    const response = await post<UserRequest, UserResponse>(
      endpoints.user.update(id)
    );
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
