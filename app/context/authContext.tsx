'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { MutationStatus, QueryStatus, useMutation, useQuery } from '@tanstack/react-query';
import { clearSession, getSession, setSession } from '../../utils/actions/session';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export type Role = 'admin' | 'content_manager' | 'member';

type UserType = {
  id: number | string;
  is_verified: boolean;
  email: string;
  role: Array<Role>;
};

interface AuthContextType {
  user?: UserType | null;
  login: ({
    // eslint-disable-next-line no-unused-vars
    email, // eslint-disable-next-line no-unused-vars
    password, // eslint-disable-next-line no-unused-vars
    role,
  }: {
    email: string;
    password: string;
    role: Role;
  }) => void;
  getUserStatus: QueryStatus;
  getUserError: Error | null;
  logout: () => void;
  loginStatus: MutationStatus;
  loginError: Error | null;
  logoutStatus: MutationStatus;
  logoutError: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getUrl(role: Role): string {
  let url = baseUrl;
  if (role === 'member') url = `${baseUrl}`;
  else if (role === 'content_manager') url = `${baseUrl}/content`;
  else if (role === 'admin') url = `${baseUrl}/admin`;
  return url;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getUser = async (): Promise<UserType | null | undefined> => {
    const session = await getSession();
    if (!session?.token || !session.role) throw new Error('No session found');
    const response = await fetch(`${getUrl(session.role)}/user`, {
      headers: {
        Accept: 'application/json',
        Referer: 'learnhub.mk',
        Authorization: `Bearer ${session.token}`,
      },
      // credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching user data');
    }
    const data = await response.json();
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
    }: {
      email: string;
      password: string;
      role: Role;
    }) => {
      return fetch(`${getUrl(role)}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Referer: 'learnhub.mk',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    },
    onSuccess: (data) =>
      data.json().then(async (res) => {
        const token = res.access_token;
        if (token) await setSession({ token, role: res.data.user.role });
        await refetchUser();
      }),
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
      await fetch(`${getUrl(session.role)}/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Referer: 'learnhub.mk',
          Authorization: `Bearer ${session.token}`,
        },
      });
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
