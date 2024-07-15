/* eslint-disable no-console */

'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

const SignIn = () => {
  useEffect(() => {
    const getCsrf = () =>
      fetch('https://staging-api.learnhub.mk/sanctum/csrf-cookie', {
        headers: {
          Accept: 'application/json',
          Referer: 'learnhub.mk',
        },
        credentials: 'include',
      });
    (async () => {
      try {
        Cookies.set('SOME', 'VALUE');
        await getCsrf();
        const cookies = Cookies.get();
        console.log({ cookies });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <form
      action={async (formData) => {
        try {
          console.log({
            password: formData.get('password') as string,
            email: formData.get('email') as string,
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

export default SignIn;
