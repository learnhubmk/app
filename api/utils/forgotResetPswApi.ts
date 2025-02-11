/* eslint-disable camelcase */
import axios from 'axios';
import getBaseUrl from '../../utils/getBaseUrl';

const API_BASE_URL = 'http://localhost:8000';
const BASE_URL = getBaseUrl();

const api = {
  resetPassword: (email: string, password: string, password_confirmation: string, token: string) =>
    axios.post(`${API_BASE_URL}/passwords/reset`, {
      email,
      password,
      // eslint-disable-next-line camelcase
      password_confirmation,
      token,
    }),
  requestPasswordReset: (email: string) =>
    axios.post(`${API_BASE_URL}/passwords/request-new`, { email, baseUrl: BASE_URL }),
};

export default api;
