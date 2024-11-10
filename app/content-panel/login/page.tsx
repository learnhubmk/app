import React from 'react';
import LoginForm from '../../../components/reusable-components/login-form/LoginForm';
import SignupAndLoginLayout from '../../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';

const Login = () => {
  return (
    <SignupAndLoginLayout
      welcomeTitle="Добредојдовте назад!"
      welcomeSubtitle="Ве молиме пополнете ги податоците подолу за да се најавите."
    >
      <LoginForm />
    </SignupAndLoginLayout>
  );
};

export default Login;
