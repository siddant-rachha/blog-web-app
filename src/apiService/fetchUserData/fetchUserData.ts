import { get } from '@/utils/apiClient';
import endpoints from '../endpoints';

interface UserResponse {
  data: 'test';
}

// Sample Function to fetch user data by ID
export const fetchUserDataById = async (id: string) => {
  try {
    const response = await get<UserResponse>(endpoints.user.fetchById(id));
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
