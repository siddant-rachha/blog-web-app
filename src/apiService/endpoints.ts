const endpoints = {
  // Sample demo endpoints
  demo: {
    fetchAll: '/api/users',
    fetchById: (id: string) => `/api/users/${id}`,
    updateById: `/api/users`,
  },
  addPostEndpoint: '/api/createpost',
  searchPostsEndpoint: '/api/searchposts',
  getPosts: '/api/getposts',
  getPostById: (id: string) => `/api/getposts?id=${id}`,
  updatePostById: (id: string) => `/api/editpost?id=${id}`,
};

export default endpoints;
