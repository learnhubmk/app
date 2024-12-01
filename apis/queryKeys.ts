const QUERY_KEYS = {
  BLOGS: {
    ALL: ['blogPosts'],
    INFINITE: ['infiniteBlogPosts', 'infinite'] as const,
  },
  USERS: {
    ALL: ['users'],
  },
  TAGS: {
    ALL: ['blogPostTags'],
  },
  MEMBERS: {
    ALL: ['members'],
  },
} as const;

export default QUERY_KEYS;
