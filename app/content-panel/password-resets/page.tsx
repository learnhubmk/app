import React from 'react';
import SignupAndLoginLayout from '../../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';
import ResetPasswordForm from '../../../components/reusable-components/reset-password-form/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <SignupAndLoginLayout
      welcomeTitle="Ресетирање на лозинка"
      welcomeSubtitle="Внесете ја вашата нова лозинка подолу."
    >
      <ResetPasswordForm />
    </SignupAndLoginLayout>
  );
};

export default ResetPassword;
