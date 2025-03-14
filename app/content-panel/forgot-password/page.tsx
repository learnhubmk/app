import React from 'react';
import SignupAndLoginLayout from '../../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';
import ForgotPasswordForm from '../../../components/reusable-components/forgot-password-form/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <SignupAndLoginLayout
      welcomeTitle="Заборавена лозинка?"
      welcomeSubtitle="Внесете ја вашата е-маил адреса и ќе ви испратиме линк за ресетирање на лозинката."
    >
      <ForgotPasswordForm />
    </SignupAndLoginLayout>
  );
};

export default ForgotPassword;
