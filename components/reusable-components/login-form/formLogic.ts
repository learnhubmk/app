import * as Yup from 'yup';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { IAuthFormProps } from '../_Types';
import { Role } from '../../../app/context/authContext';

export const initialValues: IAuthFormProps = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const loginInitialValues = {
  email: '',
  password: '',
};

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[a-zA-Z .'-]+$/, '*Невалидно име!')
    .min(2, '*Вашето име е премногу кратко!')
    .max(50, '*Вашето име е премногу долго!')
    .required('*Задолжително внесете име'),
  lastName: Yup.string()
    .min(2, '*Вашето презиме е премногу кратко!')
    .max(50, '*Вашето презиме е премногу долго!')
    .required('*Задолжително внесете презиме'),
  email: Yup.string()
    .email('*Невалидна емаил адреса')
    .required('*Задолжително внесете електронка пошта'),
  password: Yup.string()
    .min(8, '*Вашата лозинка е премногу кратка!')
    .required('*Задолжително внесете лозинка'),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('*Невалидна емаил адреса')
    .required('*Задолжително внесете емаил адреса'),
  password: Yup.string()
    .required('Задолжително внесете пасворд.')
    .min(8, 'Пасвордот би требало да содржи минимум 8 знаци.'),
});

export const handleSubmit = async (values: IAuthFormProps) => {
  try {
    const response = await fetch('https://staging-api.learnhub.mk/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(values),
    });
    await response.json();
    toast.success('Successfully registered!');
  } catch (err) {
    toast.error('Registration failed');
  }
};

export const handleLogin =
  (login: Function, loginStatus: string) =>
  async (
    values: Pick<IAuthFormProps, 'email' | 'password'>,
    { resetForm }: FormikHelpers<Pick<IAuthFormProps, 'email' | 'password'>>,
    turnstileToken: string | null
  ) => {
    if (!turnstileToken) {
      toast.error('Turnstile verification is required.');
      return;
    }
    try {
      await login({
        email: values.email,
        password: values.password,
        role: Role.content,
        cfTurnstileResponse: turnstileToken,
      });
      if (loginStatus === 'success') {
        toast.success('Успех');
        resetForm();
      } else {
        toast.error('Login failed');
      }
    } catch (error: any) {
      toast.error('Грешка');
    }
  };
