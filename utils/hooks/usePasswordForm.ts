/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
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
  const [invalidTokenError, setInvalidTokenError] = useState<string | null>(null);

  const { mutate: resetPassword, isPending, isSuccess, error: resetError } = useResetPassword();

  const formik = useFormik<ResetFormValues>({
    initialValues: {
      email: email || '',
      pwd: '',
      confirmValue: '',
    },
    validationSchema: pwdValidationSchema,
    onSubmit: (values) => {
      if (!resetToken) {
        setInvalidTokenError('Невалиден токен за ресетирање');
        return;
      }
      setInvalidTokenError(null);
      resetPassword({
        ...values,
        token: resetToken,
      });
    },
  });

  const getErrorMessage = (error: unknown): string | null => {
    if (error instanceof Error) {
      return error.message;
    }
    if (error) {
      return 'Настана грешка. Ве молиме обидете се повторно.';
    }
    return null;
  };

  const error: string | null = invalidTokenError || getErrorMessage(resetError);

  useEffect(() => {
    if (isSuccess) {
      router.push(
        `/content-panel/login?reset=success&message=Password reset successful. Please log in with your new password.`
      );
    }
  }, [isSuccess, router]);

  return {
    formik,
    isLoading: isPending,
    error,
    isSuccess,
  };
};

export const useForgotPwdForm = () => {
  const {
    mutate: requestPasswordReset,
    isPending,
    isSuccess,
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

  const getErrorMessage = (error: unknown): string | null => {
    if (error instanceof Error) {
      return error.message;
    }
    if (error) {
      return 'Внесете валидна емаил адреса која е регистрирана во системот.';
    }
    return null;
  };

  const error = getErrorMessage(requestError);

  return {
    formik,
    isLoading: isPending,
    error,
    isSuccess,
  };
};
