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
import { LoginFormProps, LoginParams } from '../../../Types';
import TextInput from '../text-input/TextInput';
import error from '../../../public/error.svg';
import linkedin from '../../../public/icons/linkedin.svg';
import github from '../../../public/icons/github.svg';
import google from '../../../public/icons/google.svg';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { theme } = useTheme();
  const { loginMutation } = useAuth();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const isLightTheme = theme === 'light';
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
      onSubmit({ ...loginParams });
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
