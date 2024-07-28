'use client';

import { useAuth } from '../context/authContext';

const Login = () => {
  const { login } = useAuth({ middleware: 'guest', redirectIfAuthenticatedTo: '/' });

  return (
    <form
      action={async (formData) => {
        try {
          login({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            role: 'content_manager',
          });
        } catch (err) {
          console.error(err);
        }
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
