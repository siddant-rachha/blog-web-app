// Sample endpoints for the API
const endpoints = {
  // Sample demo endpoints
  demo: {
    fetchAll: '/api/users',
    fetchById: (id: string) => `/api/users/${id}`,
    updateById: `/api/users`,
  },
};

export default endpoints;
