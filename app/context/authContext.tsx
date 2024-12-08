'use client';

import React, { createContext, useContext, ReactNode, useMemo, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn, useSession, signOut } from 'next-auth/react';
import { clearSession, getSession } from '../../utils/actions/session';
import { getUser, logout as logoutApi } from '../../api/authApi';
import { getUserFromStorage } from '../../api/utils/actions/session';
import { AuthContextType, LoginParams, UserType } from '../../Types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const session = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log(session);
  const userQuery = useQuery<UserType | null, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const storedUser = await getUserFromStorage();
      if (storedUser) {
        return storedUser;
      }
      return getUser();
    },
  });

  // This is loginMutation function with next-auth
  const loginMutation = useMutation({
    mutationFn: async (
      formValues: LoginParams & { userType: string; redirectUrl: string; remember: boolean }
    ) => {
      const { email, password, cfTurnstileResponse, userType, redirectUrl, remember } = formValues;

      // Call NextAuth's signIn method
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        cfTurnstileResponse,
        userType,
        remember,
      });

      if (!result?.ok) {
        throw new Error(result?.error || 'Failed to login');
      }

      router.push(redirectUrl);
      console.log(result);
      return result;
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Login error:', error);
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      signOut();
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
    },
  });

  const value: AuthContextType = useMemo(
    () => ({
      user: userQuery.data ?? null,
      login: (params: LoginParams & { userType: string; redirectUrl: string }) =>
        loginMutation.mutate(params),
      logout: () => logoutMutation.mutate(),
      userQuery: {
        status: userQuery.status,
        error: userQuery.error,
        isLoading: userQuery.status === 'pending',
      },
      loginMutation: {
        isLoading: loginMutation.status === 'pending',
        status: loginMutation.status,
        error: loginMutation.error,
      },
      logoutMutation: {
        isLoading: logoutMutation.status === 'pending',
        status: logoutMutation.status,
        error: logoutMutation.error,
      },
      loginStatus: loginMutation.status,
    }),
    [userQuery, loginMutation, logoutMutation]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
