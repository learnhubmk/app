/* eslint-disable camelcase */
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import api from '../../api/utils/forgotResetPswApi';

type ResetFormValues = {
  email: string;
  pwd: string;
  confirmValue: string;
};

const pwdValidationSchema = Yup.object({
  email: Yup.string().email('Невалидна емаил адреса').required('Задолжително'),
  pwd: Yup.string()
    .min(8, 'Лозинката мора да содржи најмалку 8 карактери')
    .required('Задолжително'),
  confirmValue: Yup.string()
    .oneOf([Yup.ref('pwd')], 'Лозинките не се совпаѓаат')
    .required('Задолжително'),
});

export const useResetPwdForm = (email: string | null, resetToken: string | null) => {
  const router = useRouter();
  const [customError, setCustomError] = useState<string | null>(null);

  const resetPwdMutation = useMutation({
    mutationFn: (values: ResetFormValues) =>
      api.resetPassword(values.email, values.pwd, values.confirmValue, resetToken as string),
    onSuccess: () => {
      router.push(`/content-panel/login?reset=success`);
    },
    onError: (error: any) => {
      setCustomError(
        error.response?.data?.message || 'Настана грешка. Ве молиме обидете се повторно.'
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      email: email || '',
      pwd: '',
      confirmValue: '',
    },
    validationSchema: pwdValidationSchema,
    onSubmit: (values) => {
      if (!resetToken) {
        setCustomError('Невалиден токен за ресетирање');
        return;
      }
      setCustomError(null);
      resetPwdMutation.mutate(values);
    },
  });

  return {
    formik,
    isLoading: resetPwdMutation.isPending,
    error: customError || (resetPwdMutation.error as Error)?.message,
    isSuccess: resetPwdMutation.isSuccess,
  };
};

export const useForgotPwdForm = () => {
  const forgotPwdMutation = useMutation({
    mutationFn: (email: string) => api.requestPasswordReset(email),
    onError: (error: any) => {
      return (
        error.response?.data?.message ||
        'Внесете валидна емаил адреса која е регистрирана во системот.'
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Невалидна емаил адреса').required('Задолжително'),
    }),
    onSubmit: (values) => {
      forgotPwdMutation.mutate(values.email);
    },
  });

  return {
    formik,
    isLoading: forgotPwdMutation.isPending,
    error: forgotPwdMutation.error,
    isSuccess: forgotPwdMutation.isSuccess,
  };
};
