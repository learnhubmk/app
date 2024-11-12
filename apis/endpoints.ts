const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables');
}

const ENDPOINTS = {
  BLOGS: {
    GET_ALL: (limit: number, skip: number) => `${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`,
    CREATE: `${API_BASE_URL}/posts`,
  },
  USERS: {
    GET_ALL: `${API_BASE_URL}/users`,
  },
  CONTACT: {
    SUBMIT: `${API_BASE_URL}/contact`,
  },
  NEWSLETTER: {
    SUBSCRIBE: `${API_BASE_URL}/newsletter-subscribers`,
  },
  TAGS: {
    GET_ALL: `${API_BASE_URL}/content/blog-post-tags`,
    CREATE: `${API_BASE_URL}/content/blog-post-tags`,
    DELETE: `${API_BASE_URL}/content/blog-post-tags`,
    EDIT: `${API_BASE_URL}/content/blog-post-tags`,
  },
};

export default ENDPOINTS;
