import { get } from '@/utils/apiClient';
import endpoints from '../endpoints';

interface DemoResponse {
  demo: 'demo';
}

export const fetchDemoDataById = async (id: string) => {
  try {
    const response = await get<DemoResponse>(endpoints.demo.fetchById(id));
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
