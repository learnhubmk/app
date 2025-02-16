/* eslint-disable camelcase */
import { useMutation } from '@tanstack/react-query';
import getBaseUrl from '../../utils/getBaseUrl';

const API_BASE_URL = 'http://localhost:8000';
const BASE_URL = getBaseUrl();

export interface ResetPasswordParams {
  email: string;
  pwd: string;
  confirmValue: string;
  token: string;
}

export interface RequestPasswordResetParams {
  email: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ email, pwd, confirmValue, token }: ResetPasswordParams) => {
      const response = await fetch(`${API_BASE_URL}/passwords/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: pwd,
          password_confirmation: confirmValue,
          token,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
      return response.json();
    },
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async ({ email }: RequestPasswordResetParams) => {
      const response = await fetch(`${API_BASE_URL}/passwords/request-new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, baseUrl: BASE_URL }),
      });
      if (!response.ok) {
        throw new Error('Failed to request password reset');
      }
      return response.json();
    },
  });
};
