/* eslint-disable camelcase */
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import api from '../../api/utils/forgotResetPswApi';

export const useResetPasswordForm = (email: string | null, resetToken: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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
        await api.resetPassword(values.email, values.password, values.confirmPassword, resetToken);
        router.push(`/content-panel/login?reset=success`);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Настана грешка. Ве молиме обидете се повторно.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading, error };
};

export const useForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
        await api.requestPasswordReset(values.email);
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

  return { formik, isLoading, error, success };
};
