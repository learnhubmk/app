'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import style from './ForgotPasswordForm.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import { useForgotPasswordForm } from '../../../utils/hooks/usePasswordForm';

const ForgotPasswordForm = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const lightTheme = theme === 'light';

  const { formik, isLoading, error, success } = useForgotPasswordForm();

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
