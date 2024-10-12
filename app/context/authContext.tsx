'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { clearSession, getSession, setSession } from '../../utils/actions/session';
import { getUser, login as loginApi, logout as logoutApi } from '../../api/authApi';
import { setUser } from '../../api/utils/actions/session';
import { AuthContextType, LoginParams, LoginResponse, UserType } from '../../_Types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userQuery = useQuery<UserType | null, Error>({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const loginMutation = useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      const { user, access_token } = data.data;
      await setSession({ token: access_token, role: user.role });
      await setUser(user);
      userQuery.refetch();
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
      userQuery.refetch();
    },
  });

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
