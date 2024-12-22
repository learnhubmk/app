import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = {
  resetPassword: (email: string, password: string, token: string) =>
    axios.post(`${API_BASE_URL}/passwords/reset`, { email, password, token }),
  requestPasswordReset: (email: string) =>
    axios.post(`${API_BASE_URL}/passwords/request-new`, { email }),
};

export default api;
