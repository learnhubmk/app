'use client';

import React, { createContext, useContext, ReactNode, useMemo, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getUser, login as loginApi, logout as logoutApi } from '../../api/authApi';
import { AuthContextType, LoginParams, LoginResponse, UserType, Session } from '../../_Types/types';
import {
  clearSession,
  getSession,
  getUserFromStorage,
  setSession,
  setUser,
} from '../../api/utils/actions/session';

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
      const { user, access_token } = data.data; // eslint-disable-line camelcase

      await setUser(user);
      queryClient.setQueryData(['user'], user);

      const sessionData: Session = { token: access_token }; // eslint-disable-line camelcase
      await setSession(sessionData);

      toast.success('Session and user data set successfully');
    },
    onError: (error) => {
      toast.error(`Login error: ${error.message}`);
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await logoutApi();
      await clearSession();
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      toast.success('Logout successful, session cleared');
    },
    onError: (error) => {
      toast.error(`Logout error: ${error.message}`);
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

  const value = useMemo<AuthContextType>(
    () => ({
      user: userQuery.data ?? null,
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
