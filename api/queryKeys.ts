const QUERY_KEYS = {
  BLOGS: {
    ALL: ['blogPosts'],
    INFINITE: ['infiniteBlogPosts', 'infinite'] as const,
  },
} as const;

export default QUERY_KEYS;
