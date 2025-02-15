'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import style from './ResetPasswordForm.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import { useResetPwdForm } from '../../../utils/hooks/usePasswordForm';
import getBaseUrl from '../../../utils/getBaseUrl';

const ResetPasswordForm = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lightTheme = theme === 'light';
  const resetToken = searchParams.get('token');
  const email = searchParams.get('email');
  const baseUrl = getBaseUrl();

  const { formik, isLoading, error, isSuccess } = useResetPwdForm(email, resetToken);

  if (isSuccess) {
    return (
      <div
        className={`${style.formWrapper} ${lightTheme ? style.lightWrapper : style.darkWrapper}`}
      >
        <div className={style.successMessage}>
          <h3>Лозинката е успешно ресетирана</h3>
          <p>Можете да се најавите со вашата нова лозинка.</p>
          <Button
            type="button"
            buttonText="Кон најава"
            buttonClass={['primaryButton']}
            onClick={() => router.push(`${baseUrl}/content-panel/login`)}
          />
        </div>
      </div>
    );
  }

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
          name="pwd"
          type="password"
          field="pwd"
          formik={formik}
          isRequired
        />
        <TextInput
          placeholder="Потврдете ја новата лозинка"
          label="Потврди Лозинка"
          name="confirmValue"
          type="password"
          field="confirmValue"
          formik={formik}
          isRequired
        />
        {error && (
          <div className={style.errorMessage}>
            {typeof error === 'string'
              ? error
              : 'Настана грешка при ресетирање на лозинката. Ве молиме обидете се повторно.'}
          </div>
        )}
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
