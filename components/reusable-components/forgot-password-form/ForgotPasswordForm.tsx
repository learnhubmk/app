'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import style from './ForgotPasswordForm.module.scss';
import { useTheme } from '../../../app/context/themeContext';

const ForgotPasswordForm = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const lightTheme = theme === 'light';

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Невалидна емаил адреса').required('Задолжително'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/passwords/request-new`, {
          email: values.email,
        });
        setSuccess(true);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            'Внесете валидна емаил адреса која е регистрирана во системот.'
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (success) {
    return (
      <div
        className={`${style.formWrapper} ${lightTheme ? style.lightWrapper : style.darkWrapper}`}
      >
        <div className={style.successMessage}>
          <h3>Проверете го вашиот е-маил</h3>
          <p>
            Доколку постои корисник со внесената е-маил адреса, ќе добиете линк за ресетирање на
            лозинката.
          </p>
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
        />
        {error && <div className={style.errorMessage}>{error}</div>}
        <Button
          type="submit"
          buttonText={isLoading ? 'Се процесира...' : 'Испрати'}
          buttonClass={['primaryButton']}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
