'use client';

import React from 'react';

import { useAuth } from '../../../app/context/authContext';
import { LoginParams } from '../../../Types';
import LoginForm from './LoginForm';

const ContentPanelLoginContainer = () => {
  const { login } = useAuth();

  const handleSubmit = async (formValues: LoginParams) => {
    login({
      ...formValues,
      userType: 'content-manager',
      redirectUrl: '/content-panel/dashboard',
    });
  };
  return (
    <>
      <LoginForm onSubmit={handleSubmit} />{' '}
    </>
  );
};

export default ContentPanelLoginContainer;
