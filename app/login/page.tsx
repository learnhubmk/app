'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FormikHelpers, useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useState } from 'react';
import Turnstile from 'react-turnstile';
import styles from './login.module.scss';
import linkedin from '../../public/icons/linkedin.svg';
import github from '../../public/icons/github.svg';
import google from '../../public/icons/google.svg';
import { useTheme } from '../context/themeContext';
import TextInput from '../../components/reusable-components/text-input/TextInput';
import { submitLoginForm } from './SubmitLoginForm';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { theme } = useTheme();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const isLightTheme = theme === 'light';
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('*Невалидна емаил адреса')
      .required('*Задолжително внесете емаил адреса'),
    password: Yup.string()
      .required('Задолжително внесете пасворд.')
      .min(8, 'Пасвордот би требало да содржи минимум 8 знаци.')
      .matches(
        /^(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
        'Мора да содржи еден број и еден посебен знак'
      ),
  });
  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    if (!turnstileToken) {
      return;
    }

    const formValues = {
      email: values.email,
      password: values.password,
      cfTurnstileResponse: turnstileToken,
    };

    try {
      const response = await submitLoginForm(formValues);
      if (response) {
        toast.success(response);

        resetForm();
      } else {
        toast.error(response);
      }
    } catch (error) {
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
      className={`${styles.loginPage} ${isLightTheme ? styles.lightLoginPage : styles.darkLoginPage}`}
    >
      <div className={styles.container}>
        <div className={styles.welcomeContainer}>
          <h1
            className={`${styles.welcomeBackTitle}  ${isLightTheme ? styles.welcomeBackTitleLight : styles.welcomeBackTitleDark}`}
          >
            Добредојдовте назад!
          </h1>
          <p
            className={`${styles.loginSubtitleInfo}  ${isLightTheme ? styles.loginSubtitleInfoLight : styles.loginSubtitleInfoDark}`}
          >
            Ве молиме пополнете ги податоците подолу за да се најавите.
          </p>

          <div className={styles.imageContainer}>
            <div className={styles.pattern}>
              <Image src="/pattern.svg" alt="pattern" fill sizes="70vw" />{' '}
            </div>
            <div className={styles.dashboard}>
              <Image
                className={styles.dashboard}
                src="/dashboard.png"
                alt="dashboard"
                width={630}
                height={513}
              />
            </div>
          </div>
        </div>
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
              placeholder="Внесете го вашиот пасворд"
              label="Пасворд"
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
                <label htmlFor="remember">Remember me</label>
              </div>

              <a className={styles.forgotPassword} href="/">
                Forgot password?
              </a>
            </div>
            <button type="submit" className={styles.loginBtn}>
              {' '}
              Log in
            </button>
            <Turnstile
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE || ''}
              onVerify={(token) => setTurnstileToken(token)}
              theme="light"
              size="invisible"
            />
          </form>
          <div className={styles.loginSocials}>
            <p>or continue with</p>
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
              Don’t have an account? <span className={styles.signup}>Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
