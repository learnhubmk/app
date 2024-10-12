'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '../../../app/context/authContext';
import { LoginParams } from '../../../_Types';
import LoginForm from '../../../components/reusable-components/login-form/LoginForm';
import SignupAndLoginLayout from '../../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';

const Login = () => {
  const router = useRouter();
  const { login, loginMutation } = useAuth();

  const submitLoginForm = async (formValues: LoginParams) => {
    try {
      await login(formValues);

      if (loginMutation.error) {
        console.error('Login failed:', loginMutation.error);
        // Handle error (e.g., show error message to user)
      } else {
        // Redirect to user dashboard
        router.push('/content-panel/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <SignupAndLoginLayout
      welcomeTitle="Добредојдовте назад!"
      welcomeSubtitle="Ве молиме пополнете ги податоците подолу за да се најавите."
    >
      <LoginForm submitLoginForm={submitLoginForm} />
    </SignupAndLoginLayout>
  );
};

export default Login;
