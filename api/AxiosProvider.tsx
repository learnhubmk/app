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

export const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AxiosContext.Provider value={axiosInstanceDefault}>{children}</AxiosContext.Provider>;
};
