'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import Turnstile from 'react-turnstile';

import styles from './LoginForm.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import { useAuth } from '../../../app/context/authContext';
import { LoginParams } from '../../../Types';
import TextInput from '../text-input/TextInput';
import error from '../../../public/error.svg';

const LoginForm = () => {
  const { theme } = useTheme();
  const { login, loginMutation } = useAuth();
  const isLightTheme = theme === 'light';
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      if (!turnstileToken) {
        // eslint-disable-next-line no-console
        console.error('Turnstile token is missing');
        return;
      }

      const loginParams: LoginParams = {
        ...values,
        cfTurnstileResponse: turnstileToken,
      };

      // Use the mutation to handle the login process
      login(loginParams);
    },
  });

  return (
    <div
      className={`${styles.loginForm} ${isLightTheme ? styles.lightLoginForm : styles.darkLoginForm}`}
    >
      <form className={styles.innerLoginForm} onSubmit={formik.handleSubmit}>
        <h2 className={styles.loginTitle}>Најави се</h2>
        <TextInput
          placeholder="Внесете ја вашата електронска пошта"
          label="Електронска Пошта"
          name="email"
          type="email"
          field="email"
          formik={formik}
          isRequired
        />
        <TextInput
          placeholder="Внесете ја вашата лозинка"
          label="Лозинка"
          name="password"
          type="password"
          field="password"
          formik={formik}
          isRequired
        />
        <div className={styles.forgotPasswordContainer}>
          <div className={styles.rememberCheck}>
            <input
              className={`${styles.checkbox} ${isLightTheme ? styles.checkboxLight : styles.darkLoginForm}`}
              type="checkbox"
              id="remember"
              name="remember"
              checked={formik.values.remember}
              onChange={formik.handleChange}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="remember">Запомни ме</label>
          </div>
          <Link href="/forgot-password" className={styles.forgotPassword}>
            Заборавена лозинка?
          </Link>
        </div>
        <button type="submit" className={styles.loginBtn} disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? 'Најавување...' : 'Најави се'}
        </button>
        {loginMutation.error && (
          <div className={styles.errorMessageContainer}>
            <Image src={error} alt="Linkedin" />
            <p className={styles.errorMessage}>Погрешни креденцијали. Обиди се повторно</p>
          </div>
        )}
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE || ''}
          onVerify={(token) => setTurnstileToken(token)}
          theme={isLightTheme ? 'light' : 'dark'}
          size="invisible"
        />
      </form>
    </div>
  );
};

export default LoginForm;
