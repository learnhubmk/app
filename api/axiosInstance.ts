import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (process.env.NEXT_PUBLIC_BEARER) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_BEARER}`;
    } else {
      throw new Error('No bearer token found');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
