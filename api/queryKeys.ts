const QUERY_KEYS = {
  BLOGS: {
    ALL: ['blogPosts'],
    INFINITE: ['infiniteBlogPosts', 'infinite'] as const,
  },
  USERS: {
    ALL: ['users'],
  },
} as const;

export default QUERY_KEYS;
