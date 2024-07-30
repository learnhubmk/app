const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables');
}

const ENDPOINTS = {
  BLOGS: {
    GET_ALL: (limit: number, skip: number) => `${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`,
  },
  USERS: {
    GET_ALL: `${API_BASE_URL}/users`,
  },
};

export default ENDPOINTS;
