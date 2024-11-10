'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext';
import { LoginParams } from '../../../Types';
import LoginForm from '../../../components/reusable-components/login-form/LoginForm';
import SignupAndLoginLayout from '../../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';

const Login = () => {
  const router = useRouter();
  const { login, loginMutation } = useAuth();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (formValues: LoginParams) => {
    if (!turnstileToken) {
      // eslint-disable-next-line no-console
      console.error('Turnstile token is missing');
      return;
    }

    const loginParams: LoginParams = {
      ...formValues,
      cfTurnstileResponse: turnstileToken,
    };

    try {
      const res = login({
        email: loginParams.email,
        password: loginParams.password,
        cfTurnstileResponse: loginParams.cfTurnstileResponse,
      });
      if (loginMutation.error) {
        // eslint-disable-next-line no-console
        console.error('Login failed:', loginMutation.error);
      } else {
        router.push('/content-panel/dashboard');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login failed:', error);
    }
  };

  return (
    <SignupAndLoginLayout
      welcomeTitle="Добредојдовте назад!"
      welcomeSubtitle="Ве молиме пополнете ги податоците подолу за да се најавите."
    >
      <LoginForm
      // onSubmit={handleSubmit}
      // isLoading={loginMutation.isLoading}
      // turnstileToken={turnstileToken}
      // setTurnstileToken={setTurnstileToken}
      />
    </SignupAndLoginLayout>
  );
};

export default Login;
