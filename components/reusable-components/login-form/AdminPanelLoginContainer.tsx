'use client';

import React from 'react';

import { useAuth } from '../../../app/context/authContext';
import { LoginParams } from '../../../Types';
import LoginForm from './LoginForm';

const AdminPanelLoginContainer = () => {
  const { login } = useAuth();
  const handleSubmit = async (formValues: LoginParams) => {
    login({
      ...formValues,
      userType: 'admin',
      redirectUrl: '/admin-dashboard',
    });
  };
  return (
    <>
      <LoginForm onSubmit={handleSubmit} />{' '}
    </>
  );
};

export default AdminPanelLoginContainer;
