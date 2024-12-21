'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import style from './ResetPasswordForm.module.scss';
import { useTheme } from '../../../app/context/themeContext';

const ResetPasswordForm = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const lightTheme = theme === 'light';

  const resetToken = searchParams.get('token');
  const email = searchParams.get('email');

  const formik = useFormik({
    initialValues: {
      email: email || '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Невалидна емаил адреса').required('Задолжително'),
      password: Yup.string()
        .min(8, 'Лозинката мора да содржи најмалку 8 карактери')
        .required('Задолжително'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Лозинките не се совпаѓаат')
        .required('Задолжително'),
    }),
    onSubmit: async (values) => {
      if (!resetToken) {
        setError('Невалиден токен за ресетирање');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/passwords/reset`, {
          email: values.email,
          password: values.password,
          token: resetToken,
        });

        router.push('/content-panel/login?reset=success');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Настана грешка. Ве молиме обидете се повторно.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (!resetToken || !email) {
    return (
      <div
        className={`${style.formWrapper} ${lightTheme ? style.lightWrapper : style.darkWrapper}`}
      >
        <div className={style.errorState}>
          <h3>Невалиден линк</h3>
          <p>Линкот за ресетирање на лозинката е невалиден или истечен.</p>
          <Button
            type="button"
            buttonText="Назад кон најава"
            buttonClass={['primaryButton']}
            onClick={() => router.push('/content-panel/login')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${style.formWrapper} ${lightTheme ? style.lightWrapper : style.darkWrapper}`}>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <TextInput
          placeholder="Внесете ја вашата електронска пошта"
          label="Електронска Пошта"
          name="email"
          type="email"
          field="email"
          formik={formik}
          isRequired
          disabled
        />
        <TextInput
          placeholder="Внесете нова лозинка"
          label="Нова Лозинка"
          name="password"
          type="password"
          field="password"
          formik={formik}
          isRequired
        />
        <TextInput
          placeholder="Потврдете ја новата лозинка"
          label="Потврди Лозинка"
          name="confirmPassword"
          type="password"
          field="confirmPassword"
          formik={formik}
          isRequired
        />
        {error && <div className={style.errorMessage}>{error}</div>}
        <Button
          type="submit"
          buttonText={isLoading ? 'Се процесира...' : 'Ресетирај лозинка'}
          buttonClass={['primaryButton']}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
