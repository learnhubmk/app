'use client';

import { AuthMiddleware, Role, useAuth } from '../context/authContext';

const Login = () => {
  const { login, loginStatus } = useAuth({
    middleware: AuthMiddleware.guest,
    redirectIfAuthenticatedTo: '/',
  });

  return (
    <form
      action={async (formData) => {
        login({
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          role: Role.content_manager,
        });
      }}
    >
      <label htmlFor="email">
        Email
        <input name="email" type="email" />
      </label>
      <label htmlFor="password">
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit" disabled={loginStatus === 'pending'}>
        {loginStatus === 'pending' ? 'Loading...' : 'Sign In'}
      </button>
    </form>
  );
};

export default Login;
