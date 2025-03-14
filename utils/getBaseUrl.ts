const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_PROD_BASE_URL || '';
  }
  return process.env.NEXT_PUBLIC_DEV_BASE_URL || '';
};

export default getBaseUrl;
