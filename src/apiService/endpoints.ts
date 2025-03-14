const endpoints = {
  // Sample demo endpoints
  demo: {
    fetchAll: '/api/users',
    fetchById: (id: string) => `/api/users/${id}`,
    updateById: `/api/users`,
  },
  addPostEndpoint: '/api/createpost',
};

export default endpoints;
