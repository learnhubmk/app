// pages/signup/index.tsx

'use client';

import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import SignupAndLoginLayout from '../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';
import ReusableForm from '../../components/reusable-components/reusable-form/ReusableForm';
import { IAuthFormProps } from '../../components/reusable-components/_Types';
import github from '../../public/icons-footer/github.svg';
import linkedin from '../../public/icons-footer/linkedIn.svg';
import google from '../../public/icons-footer/google.svg';

const SignupPage = () => {
  const initialValues: IAuthFormProps = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
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

  const handleSubmit = async (values: IAuthFormProps) => {
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
      console.error(err);
      toast.error('Registration failed');
    }
  };

  const signupFields = [
    { name: 'firstName', type: 'text', label: 'Име *', placeholder: 'Внесете го вашето име' },
    {
      name: 'lastName',
      type: 'text',
      label: 'Презиме *',
      placeholder: 'Внесете го вашето презиме',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Електронска пошта *',
      placeholder: 'Внесете ја вашата електронска пошта',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Лозинка *',
      placeholder: 'Внесете ја вашата лозинка',
    },
  ];

  const socialLinks = [
    { id: 'github', icon: github, url: 'https://github.com', alt: 'Github' },
    { id: 'google', icon: google, url: 'https://google.com', alt: 'Google' },
    { id: 'linkedin', icon: linkedin, url: 'https://linkedin.com', alt: 'LinkedIn' },
  ];

  return (
    <SignupAndLoginLayout
      welcomeTitle="Добредојдовте на платформата!"
      welcomeSubtitle="Ве молиме пополнете ги податоците подолу за да креирате свој профил."
    >
      <ReusableForm
        title="Регистрирај се"
        fields={signupFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        submitButtonText="Регистрирај се"
        socialLinks={socialLinks}
        alternativeActionText="Веќе имаш креиран профил?"
        alternativeActionLink="/login"
        alternativeActionLinkText="Најави се"
      />
    </SignupAndLoginLayout>
  );
};

export default SignupPage;
