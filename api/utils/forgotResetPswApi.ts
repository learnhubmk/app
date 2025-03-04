/* eslint-disable camelcase */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import getBaseUrl from '../../utils/getBaseUrl';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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

interface ErrorResponse {
  message: string;
  statusCode?: number;
}

const resetPassword = async ({ email, pwd, confirmValue, token }: ResetPasswordParams) => {
  const response = await axios.post(`${API_BASE_URL}/passwords/reset`, {
    email,
    password: pwd,
    password_confirmation: confirmValue,
    token,
  });
  return response.data;
};

const requestPasswordReset = async ({ email }: RequestPasswordResetParams) => {
  const response = await axios.post(`${API_BASE_URL}/passwords/request-new`, {
    email,
    baseUrl: BASE_URL,
  });
  return response.data;
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetPassword,
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        'Грешка при ресетирање на лозинката:',
        error.response?.data?.message || error.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordReset,
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        'Грешка при барање за ресетирање на лозинката:',
        error.response?.data?.message || error.message
      );
    },
  });
};
