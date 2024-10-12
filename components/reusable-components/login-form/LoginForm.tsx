'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Turnstile from 'react-turnstile';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useAuth } from '../../../app/context/authContext';
import { useTheme } from '../../../app/context/themeContext';
import TextInput from '../text-input/TextInput';
import styles from './LoginForm.module.scss';
import linkedin from '../../../public/icons/linkedin.svg';
import github from '../../../public/icons/github.svg';
import google from '../../../public/icons/google.svg';
import { LoginParams } from '../../../_Types';
import { loginInitialValues, loginValidationSchema } from './formLogic';

interface LoginFormProps {
  submitLoginForm: (formValues: LoginParams) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ submitLoginForm }) => {
  const { loginMutation } = useAuth();
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, formikHelpers) => {
      if (!turnstileToken) {
        toast.error('Turnstile verification is required.');
        return;
      }

      const payload: LoginParams = {
        email: values.email,
        password: values.password,
        cfTurnstileResponse: turnstileToken,
      };

      try {
        await submitLoginForm(payload);
        toast.success('Успешно најавување!');
        // Don't reset the form here, as it might interfere with the redirection
      } catch (error) {
        console.error('Login failed:', error);
        toast.error('Неуспешно најавување. Обидете се повторно.');
        formikHelpers.setSubmitting(false);
      }
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
              className={`${styles.checkbox} ${isLightTheme ? styles.checkboxLight : styles.checkboxDark}`}
              type="checkbox"
              id="remember"
              name="remember"
            />
            <label htmlFor="remember">Запомни ме</label>
          </div>
          <Link href="/forgot-password" className={styles.forgotPassword}>
            Заборавена лозинка?
          </Link>
        </div>
        <button type="submit" className={styles.loginBtn} disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? 'Најавување...' : 'Најави се'}
        </button>
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
