'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import style from './ResetPasswordForm.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import { useResetPasswordForm } from '../../../utils/hooks/usePasswordForm';
import getBaseUrl from '../../../utils/getBaseUrl';

const ResetPasswordForm = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lightTheme = theme === 'light';
  const resetToken = searchParams.get('token');
  const email = searchParams.get('email');
  const baseUrl = getBaseUrl();

  const { formik, isLoading, error } = useResetPasswordForm(email, resetToken);

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
            onClick={() => router.push(`${baseUrl}/content-panel/login`)}
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
