'use client';

import { FormikHelpers, useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useState } from 'react';
import Turnstile from 'react-turnstile';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LoginForm.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import TextInput from '../text-input/TextInput';
import linkedin from '../../../public/icons/linkedin.svg';
import github from '../../../public/icons/github.svg';
import google from '../../../public/icons/google.svg';
import { Role, useAuth } from '../../../app/context/authContext';

interface FormValues {
  email: string;
  password: string;
}
const LoginForm = () => {
  const { theme } = useTheme();
  const { login, loginStatus } = useAuth();
  const isLightTheme = theme === 'light';

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('*Невалидна емаил адреса')
      .required('*Задолжително внесете емаил адреса'),
    password: Yup.string()
      .required('Задолжително внесете пасворд.')
      .min(8, 'Пасвордот би требало да содржи минимум 8 знаци.'),
  });
  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    if (!turnstileToken) {
      toast.error('Turnstile verification is required.');
      return;
    }
    try {
      const response = await login({
        email: values.email,
        password: values.password,
        role: Role.content,
        cfTurnstileResponse: turnstileToken,
      });
      console.log(response);
      if (loginStatus === 'success') {
        toast.success('Успех');
        resetForm();
      } else {
        toast.error('Login failed');
      }
    } catch (error: any) {
      toast.error('Грешка');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
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
        />{' '}
        <div className={styles.forgotPasswordContainer}>
          <div className={styles.rememberCheck}>
            <input
              className={`${styles.checkbox} ${isLightTheme ? styles.checkboxLight : styles.checkboxDark}`}
              type="checkbox"
              id="remember"
              name="remember"
            />{' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="remember">Запомни ме</label>
          </div>

          <a className={styles.forgotPassword} href="/">
            Заборавена лозинка?
          </a>
        </div>
        <button type="submit" className={styles.loginBtn}>
          {' '}
          Најави се
        </button>
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE || ''}
          onVerify={(token) => setTurnstileToken(token)}
          theme="light"
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
        </div>{' '}
        <p>
          Немаш креиран профил? <span className={styles.signup}>Регистрирај се</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
