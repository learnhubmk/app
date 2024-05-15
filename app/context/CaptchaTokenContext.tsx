'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
/* eslint-disable */
interface CaptchaContextType {
  captchaToken: string | null;
  setToken: (token: string | null) => void;
  hasRenderedWidget: boolean;
}
/* eslint-enable */
const CaptchaTokenContext = createContext<CaptchaContextType | undefined>(undefined);

export const useCaptchaToken = () => {
  const context = useContext(CaptchaTokenContext);
  if (!context) {
    throw new Error('useCaptchaToken must be used within a CaptchaTokenProvider');
  }
  return context;
};

export const CaptchaTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [hasRenderedWidget, setHasRenderedWidget] = useState<boolean>(false);

  const setToken = (token: string | null) => {
    if (!hasRenderedWidget) {
      console.log('Captcha work');
      setCaptchaToken(token);
    }
  };

  useEffect(() => {
    if (!hasRenderedWidget) {
      setHasRenderedWidget(true);
    }
  }, [hasRenderedWidget]);

  return (
    /* eslint-disable */
    <CaptchaTokenContext.Provider value={{ captchaToken, setToken, hasRenderedWidget }}>
      {children}
    </CaptchaTokenContext.Provider>
    /* eslint-enable */
  );
};
