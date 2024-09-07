'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { MutationStatus, QueryStatus, useMutation, useQuery } from '@tanstack/react-query';
import { clearSession, getSession, setSession } from '../../utils/actions/session';
import getAuthUrl from '../../utils/getAuthUrl';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export enum Role {
  admin = 'admin',
  content_manager = 'content_manager',
  member = 'member',
}

export enum AuthMiddleware {
  auth = 'auth',
  guest = 'guest',
}

type UserType = {
  id: number | string;
  is_verified: boolean;
  email: string;
  role: Role;
};

interface LoginParams {
  email: string;
  password: string;
  role: Role;
  cfTurnstileResponse: string;
}

interface SuccessfulLoginResponse {
  data: { user: UserType; access_token: string };
}

interface AuthContextType {
  user?: UserType | null;
  login: ({ email, password, role }: LoginParams) => void;
  getUserStatus: QueryStatus;
  getUserError: Error | null;
  logout: () => void;
  loginStatus: MutationStatus;
  loginError: Error | null;
  logoutStatus: MutationStatus;
  logoutError: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getUser = async (): Promise<UserType | null | undefined> => {
    const session = await getSession();
    if (!session?.token || !session.role) throw new Error('No session found');
    const response = await fetch(`${getAuthUrl(baseUrl, session.role)}/user`, {
      headers: {
        Accept: 'application/json',
        Referer: 'learnhub.mk',
        Authorization: `Bearer ${session.token}`,
      },
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(response.statusText || 'An error occurred while fetching the user');
    }
    const data = await response.json();
    console.log(data);
    return data.data.user;
  };

  const {
    data: user,
    status: getUserStatus,
    error: getUserError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const {
    mutate: login,
    error: loginError,
    status: loginStatus,
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({
      email,
      password,
      role,
      cfTurnstileResponse,
    }: LoginParams): Promise<SuccessfulLoginResponse> => {
      const response = await fetch(`${getAuthUrl(baseUrl, role)}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, cfTurnstileResponse }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred while logging in');
      }

      const data = await response.json();
      return data;
    },
    onSuccess: async (data) => {
      const token = data.data.access_token;
      if (token) await setSession({ token, role: data.data.user.role });
      await refetchUser();
    },
    onError: (error) => {
      throw new Error(error?.message || 'An error occurred while logging in');
    },
  });

  const {
    status: logoutStatus,
    mutate: logout,
    error: logoutError,
  } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const session = await getSession();
      if (!session?.token || !session.role) throw new Error('No session found');
      const response = await fetch(`${getAuthUrl(baseUrl, session.role)}/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Referer: 'learnhub.mk',
          Authorization: `Bearer ${session.token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred while logging in');
      }
    },
    onSuccess: async () => {
      await clearSession();
      await refetchUser();
    },
    onError: (error) => {
      throw new Error(error?.message || 'An error occurred while logging out');
    },
  });

  const memoizedValue = useMemo(
    () => ({
      user,
      getUserStatus,
      getUserError,
      login,
      logout,
      loginStatus,
      loginError,
      logoutStatus,
      logoutError,
    }),
    [
      user,
      getUserStatus,
      getUserError,
      login,
      logout,
      loginStatus,
      loginError,
      logoutStatus,
      logoutError,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
