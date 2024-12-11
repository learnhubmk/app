'use client';

import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

export type LoginParams = {
  email: string;
  password: string;
  cfTurnstileResponse?: string;
  userType: string;
  remember?: boolean;
};

const useLogin = () => {
  return useMutation({
    mutationFn: async (formValues: LoginParams) => {
      const result = await signIn('credentials', {
        redirect: false,
        ...formValues,
      });

      if (!result?.ok) {
        throw new Error(result?.error || 'Неуспешна најава');
      }

      return result;
    },
    onError: () => {
      toast.error('Неуспешна најава.');
    },
    onSuccess: () => {
      toast.success('Најавата беше успешна.');
    },
  });
};

export { useLogin };
