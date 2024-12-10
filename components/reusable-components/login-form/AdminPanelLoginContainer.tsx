'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import { useLogin } from '../../../apis/mutations/login/useLogin';
import { LoginParams } from '../../../Types';

const AdminPanelLoginContainer = () => {
  const router = useRouter();
  const { mutate, isPending, isError } = useLogin();
  const handleSubmit = async (formValues: LoginParams) => {
    mutate(
      {
        ...formValues,
        userType: 'admin',
      },
      {
        onSuccess: () => {
          router.push('/admin-panel');
        },
      }
    );
  };

  return (
    <>
      <LoginForm isError={isError} isLoading={isPending} onSubmit={handleSubmit} />{' '}
    </>
  );
};

export default AdminPanelLoginContainer;
