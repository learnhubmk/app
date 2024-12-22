const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_PROD_BASE_URL || 'https://staging.learnhub.mk';
  }
  return process.env.NEXT_PUBLIC_DEV_BASE_URL || 'http://localhost:3001';
};

export default getBaseUrl;
