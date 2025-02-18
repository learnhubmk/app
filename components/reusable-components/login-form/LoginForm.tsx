'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Turnstile from 'react-turnstile';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../text-input/TextInput';

import github from '../../../public/icons/github.svg';
import error from '../../../public/error.svg';
import linkedin from '../../../public/icons/linkedin.svg';
import google from '../../../public/icons/google.svg';

import { useTheme } from '../../../app/context/themeContext';
import { LoginFormProps, LoginParams } from '../../../Types';
import styles from './LoginForm.module.scss';

const LoginForm = ({ isError, isLoading, onSubmit }: LoginFormProps) => {
  const { theme } = useTheme();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isLightTheme = theme === 'light';
  const searchParams = useSearchParams();

  useEffect(() => {
    const reset = searchParams.get('reset');
    if (reset === 'success') {
      setSuccessMessage('Password reset successful. Please log in with your new password.');
    }
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Невалидна емаил адреса').required('Задолжително'),
      password: Yup.string().required('Задолжително'),
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
      onSubmit({ ...loginParams });
    },
  });

  return (
    <div
      className={`${styles.loginForm} ${isLightTheme ? styles.lightLoginForm : styles.darkLoginForm}`}
    >
      <form className={styles.innerLoginForm} onSubmit={formik.handleSubmit}>
        <h2 className={styles.loginTitle}>Најави се</h2>
        {successMessage && (
          <div className={styles.successMessageContainer}>
            <p className={styles.successMessage}>{successMessage}</p>
          </div>
        )}
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
          <Link href="/content-panel/forgot-password" className={styles.forgotPassword}>
            Заборавена лозинка?
          </Link>
        </div>
        <button type="submit" className={styles.loginBtn} disabled={isLoading}>
          {isLoading ? 'Најавување...' : 'Најави се'}
        </button>
        {isError && (
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
      <div className={styles.loginSocials}>
        <p>или продолжи со</p>
        <div className={styles.socialIcons}>
          <Link href="https://github.com/learnhubmk" target="_blank" rel="noopener noreferrer">
            <Image className={styles.socialIcon} src={github} alt="Github" />
          </Link>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <Image className={styles.socialIcon} src={google} alt="Youtube" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/102600044/admin/feed/posts/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className={styles.socialIcon} src={linkedin} alt="Linkedin" />
          </Link>
        </div>
        <p>
          Немаш креиран профил?{' '}
          <Link href="/signup" className={styles.signup}>
            Регистрирај се
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
