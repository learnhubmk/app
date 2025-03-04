'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import style from './ResetPasswordForm.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import { useResetPassword, ResetPasswordParams } from '../../../api/utils/forgotResetPswApi';
import getBaseUrl from '../../../utils/getBaseUrl';

const ResetPasswordForm: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lightTheme = theme === 'light';
  const resetToken = searchParams.get('token');
  const email = searchParams.get('email');
  const baseUrl = getBaseUrl();

  const resetPasswordMutation = useResetPassword();

  const formik = useFormik<ResetPasswordParams>({
    initialValues: {
      email: email || '',
      pwd: '',
      confirmValue: '',
      token: resetToken || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Невалидна е-маил адреса').required('Задолжително'),
      pwd: Yup.string().min(8, 'Мора да содржи најмалку 8 карактери').required('Задолжително'),
      confirmValue: Yup.string()
        .oneOf([Yup.ref('pwd')], 'Лозинките мора да се совпаѓаат')
        .required('Задолжително'),
      token: Yup.string().required('Токенот е задолжителен'),
    }),
    onSubmit: (values) => {
      resetPasswordMutation.mutate(values, {
        onSuccess: () => {
          toast.success('Лозинката е успешно ресетирана!');
          router.push(`${baseUrl}/content-panel/login?reset=success`);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Настана грешка при ресетирање на лозинката.'
          );
        },
      });
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
          disabled={resetPasswordMutation.isPending}
        />
        <TextInput
          placeholder="Потврдете ја новата лозинка"
          label="Потврди Лозинка"
          name="confirmValue"
          type="password"
          field="confirmValue"
          formik={formik}
          isRequired
          disabled={resetPasswordMutation.isPending}
        />
        <Button
          type="submit"
          buttonText={resetPasswordMutation.isPending ? 'Се процесира...' : 'Ресетирај лозинка'}
          buttonClass={['primaryButton']}
          disabled={resetPasswordMutation.isPending}
        />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
