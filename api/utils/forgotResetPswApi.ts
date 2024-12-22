import axios from 'axios';
import getBaseUrl from '../../utils/getBaseUrl';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = getBaseUrl();

const api = {
  resetPassword: (email: string, password: string, token: string) =>
    axios.post(`${API_BASE_URL}/passwords/reset`, { email, password, token }),
  requestPasswordReset: (email: string) =>
    axios.post(`${API_BASE_URL}/passwords/request-new`, { email, baseUrl: BASE_URL }),
};

export default api;
