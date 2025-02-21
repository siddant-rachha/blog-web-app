import { post } from '@/utils/apiClient';
import endpoints from '../endpoints';

interface DemoRequest {
  id: string;
  demo: 'demo';
}
interface DemoResponse {
  response: 'test';
}

// Sample Function to fetch user data by ID
export const postDemoData = async (data: DemoRequest) => {
  try {
    const response = await post<DemoRequest, DemoResponse>(
      endpoints.demo.updateById,
      data
    );
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
