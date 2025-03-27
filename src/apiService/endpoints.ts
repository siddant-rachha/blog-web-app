const endpoints = {
  // Sample demo endpoints
  demo: {
    fetchAll: '/api/users',
    fetchById: (id: string) => `/api/users/${id}`,
    updateById: `/api/users`,
  },
  addPostEndpoint: '/api/createpost',
  searchPostsEndpoint: '/api/searchposts',
  getPosts: (bool?: boolean) => `/api/getposts?latest=${bool}`,
  getPostById: (id: string) => `/api/getposts?id=${id}`,
  updatePostById: (id: string) => `/api/editpost?id=${id}`,
  deletePost: '/api/deletepost',
  myposts: (bool?: boolean) => `/api/getposts?myposts=true&latest=${bool}`,
};

export default endpoints;
