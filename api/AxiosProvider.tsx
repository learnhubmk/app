'use client';

import React, { createContext, useContext } from 'react';
import { AxiosInstance } from 'axios';
import axiosInstanceDefault from './axiosInstance';

const AxiosContext = createContext<AxiosInstance | null>(null);

export const useAxios = () => {
  const axiosInstance = useContext(AxiosContext);
  if (!axiosInstance) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }
  return axiosInstance;
};

interface AxiosProviderProps {
  children: React.ReactNode;
}

export const AxiosProvider = ({ children }: AxiosProviderProps) => {
  return <AxiosContext.Provider value={axiosInstanceDefault}>{children}</AxiosContext.Provider>;
};
