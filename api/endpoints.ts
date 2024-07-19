const API_BASE_URL = 'https://dummyjson.com';

const ENDPOINTS = {
  BLOGS: {
    GET_ALL: (limit: number, skip: number) => `${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`,
  },
};

export default ENDPOINTS;
