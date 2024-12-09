'use client';

import React from 'react';

import LoginForm from './LoginForm';
import { useLogin } from '../../../apis/mutations/login/useLogin';
import { LoginParams } from '../../../Types';

const AdminPanelLoginContainer = () => {
  const { mutate, isPending, isError } = useLogin();
  const handleSubmit = async (formValues: LoginParams) => {
    mutate({
      ...formValues,
      userType: 'admin',
      redirectUrl: '/admin-panel',
    });
  };

  return (
    <>
      <LoginForm isError={isError} isLoading={isPending} onSubmit={handleSubmit} />{' '}
    </>
  );
};

export default AdminPanelLoginContainer;
