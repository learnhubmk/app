/* eslint-disable camelcase */
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import {
  useResetPassword,
  useRequestPasswordReset,
  ResetPasswordParams,
} from '../../api/utils/forgotResetPswApi';

type ResetFormValues = Omit<ResetPasswordParams, 'token'>;

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

  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    isError,
    error: resetError,
  } = useResetPassword();

  const formik = useFormik<ResetFormValues>({
    initialValues: {
      email: email || '',
      pwd: '',
      confirmValue: '',
    },
    validationSchema: pwdValidationSchema,
    onSubmit: (values) => {
      if (!resetToken) {
        resetPassword({
          ...values,
          token: '',
        });
        return;
      }
      resetPassword({
        ...values,
        token: resetToken,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push('/content-panel/login?status=reset_success');
    }
  }, [isSuccess, router]);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (error) {
      return String(error);
    }
    return 'Настана грешка. Ве молиме обидете се повторно.';
  };

  return {
    formik,
    isLoading: isPending,
    error: isError ? getErrorMessage(resetError) : null,
    isSuccess,
  };
};

export const useForgotPwdForm = () => {
  const {
    mutate: requestPasswordReset,
    isPending,
    isSuccess,
    isError,
    error: requestError,
  } = useRequestPasswordReset();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Невалидна емаил адреса').required('Задолжително'),
    }),
    onSubmit: (values) => {
      requestPasswordReset({ email: values.email });
    },
  });

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (error) {
      return String(error);
    }
    return 'Внесете валидна емаил адреса која е регистрирана во системот.';
  };

  return {
    formik,
    isLoading: isPending,
    error: isError ? getErrorMessage(requestError) : null,
    isSuccess,
  };
};
