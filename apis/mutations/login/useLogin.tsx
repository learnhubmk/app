'use client';

import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export type LoginParams = {
  email: string;
  password: string;
  cfTurnstileResponse?: string;
  userType: string;
  redirectUrl: string;
  remember?: boolean;
};

type ErrorResponse = {
  message: string;
  statusCode?: number;
};

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (
      formValues: LoginParams & { userType: string; redirectUrl: string; remember: boolean }
    ) => {
      const { email, password, cfTurnstileResponse, userType, redirectUrl, remember } = formValues;

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        cfTurnstileResponse,
        userType,
        remember,
      });

      if (!result?.ok) {
        throw new Error(result?.error || 'Неуспешна најава');
      }

      router.push(redirectUrl);
      return result;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Неуспешна најава.');
    },
    onSuccess: () => {
      toast.success('Најавата беше успешна.');
    },
  });
};

export { useLogin };
