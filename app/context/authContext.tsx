'use client';

import React, { createContext, useContext, ReactNode, useMemo, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clearSession, getSession } from '../../utils/actions/session';
import { getUser, login as loginApi, logout as logoutApi } from '../../api/authApi';
import { getUserFromStorage } from '../../api/utils/actions/session';
import { AuthContextType, LoginParams, LoginResponse, UserType } from '../../_Types';
import { saveToLocalStorage } from '../../api/utils/localStorageUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

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

  const loginMutation = useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      console.log('Login mutation successful, data:', data);
      const { user, access_token } = data.data;

      // Save user data
      saveToLocalStorage('user', user);
      queryClient.setQueryData(['user'], user);

      // Save access token
      saveToLocalStorage('access_token', access_token);

      // Optionally, you can also save a session object
      saveToLocalStorage('session', { token: access_token, role: user.role });

      console.log('localStorage after login:', {
        access_token: localStorage.getItem('access_token'),
        session: localStorage.getItem('session'),
        user: localStorage.getItem('user'),
      });
    },
    onError: (error) => {
      console.error('Login mutation error:', error);
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      const session = await getSession();
      if (session) {
        await logoutApi();
      }
      await clearSession();
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        userQuery.refetch();
      }
    };
    checkSession();
  }, [userQuery]);

  const value: AuthContextType = useMemo(
    () => ({
      user: userQuery.data,
      login: (params: LoginParams) => loginMutation.mutate(params),
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
