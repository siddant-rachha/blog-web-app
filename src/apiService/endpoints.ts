// Sample endpoints for the API
const endpoints = {
  // Sample User endpoints
  user: {
    fetchAll: '/api/users',
    fetchById: (id: string) => `/api/users/${id}`,
    create: '/api/users',
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
  },
  // Sample Auth endpoints
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
  },
};

export default endpoints;
