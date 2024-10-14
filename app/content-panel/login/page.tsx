'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext';
import { LoginParams } from '../../../_Types/types';
import LoginForm from '../../../components/reusable-components/login-form/LoginForm';
import SignupAndLoginLayout from '../../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';

const Login = () => {
  const router = useRouter();
  const { login, loginMutation } = useAuth();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (formValues: LoginParams) => {
    if (!turnstileToken) {
      console.error('Turnstile token is missing'); // eslint-disable-line no-console
      return;
    }

    const loginParams: LoginParams = {
      ...formValues,
      cfTurnstileResponse: turnstileToken,
    };

    try {
      await login(loginParams);
      if (loginMutation.error) {
        console.error('Login failed:', loginMutation.error); // eslint-disable-line no-console
      } else {
        router.push('/content-panel/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error); // eslint-disable-line no-console
    }
  };

  return (
    <SignupAndLoginLayout
      welcomeTitle="Добредојдовте назад!"
      welcomeSubtitle="Ве молиме пополнете ги податоците подолу за да се најавите."
    >
      <LoginForm
        onSubmit={handleSubmit}
        isLoading={loginMutation.isLoading}
        turnstileToken={turnstileToken}
        setTurnstileToken={setTurnstileToken}
      />
    </SignupAndLoginLayout>
  );
};

export default Login;
