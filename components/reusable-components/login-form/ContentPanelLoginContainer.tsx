'use client';

import React from 'react';

import LoginForm from './LoginForm';
import { useLogin } from '../../../apis/mutations/login/useLogin';
import { LoginParams } from '../../../Types';

const ContentPanelLoginContainer = () => {
  const { isPending, isError, mutate } = useLogin();

  const handleSubmit = async (formValues: LoginParams) => {
    mutate({
      ...formValues,
      userType: 'content-manager',
      redirectUrl: '/content-panel',
    });
  };

  return <LoginForm isError={isError} isLoading={isPending} onSubmit={handleSubmit} />;
};

export default ContentPanelLoginContainer;
