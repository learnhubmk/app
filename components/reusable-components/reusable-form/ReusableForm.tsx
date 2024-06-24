/* eslint-disable no-unused-vars */

'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, FormikProps } from 'formik';
import Link from 'next/link';
import Image from 'next/image';
import style from './reusableForm.module.scss';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import github from '../../../public/icons-footer/github.svg';
import linkedin from '../../../public/icons-footer/linkedIn.svg';
import google from '../../../public/icons-footer/google.svg';
import check from '../../../public/icons/check.svg';

const ReusableForm = () => {
  const [password, setPassword] = useState<string>('');

  const initialValues = {
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
      .matches(/[a-zA-Z]/, '*Лозинката не ги исполнува сите услови!')
      .min(8, '*Вашата лозинка е премногу кратка!')
      .required('*Задолжително внесете лозинка'),
  });

  const formik: FormikProps<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    formik.handleChange(e);
  };

  const isPasswordValid = (rule: string, password: string): boolean => {
    if (rule === 'uppercase') {
      return /[A-Z]/.test(password);
    }
    if (rule === 'specialChar') {
      return /[!@#$%^&*(),.?":{}|<>]/.test(password);
    }
    if (rule === 'minLength') {
      return password.length >= 8;
    }
    return false;
  };

  return (
    <div className={style.reusableFormWrapper}>
      <h2 className={style.formTitle}>Регистрирај се</h2>
      <form className={style.reusableForm} onSubmit={formik.handleSubmit}>
        <TextInput
          placeholder="Внесете го вашето име"
          type="text"
          label="Име *"
          name="firstName"
          field="firstName"
          formik={formik}
          inputClass={[`${style.signUpInput}`]}
        />
        <TextInput
          placeholder="Внесете го вашето презиме"
          type="text"
          label="Презиме *"
          name="lastName"
          field="lastName"
          formik={formik}
          inputClass={[style.signUpInput]}
        />
        <TextInput
          placeholder="Внесете ја вашата електронска пошта"
          type="email"
          label="Електронска пошта *"
          name="email"
          field="email"
          formik={formik}
          inputClass={['signUpInput']}
        />
        <TextInput
          placeholder="Внесете ја вашата лозинка"
          type="password"
          label="Лозинка *"
          name="password"
          field="password"
          formik={formik}
          inputClass={['signUpInput']}
          onChange={handlePasswordChange}
        />
        <div className={style.requirements}>
          <div className={style.requirementsItem}>
            <Image
              src={check}
              alt="check"
              className={
                isPasswordValid('uppercase', formik.values.password) ? style.valid : style.invalid
              }
            />
            <p>Една голема буква</p>
          </div>
          <div className={style.requirementsItem}>
            <Image
              src={check}
              alt="check"
              className={
                isPasswordValid('specialChar', formik.values.password) ? style.valid : style.invalid
              }
            />
            <p>Еден специјален знак или симбол</p>
          </div>
          <div className={style.requirementsItem}>
            <Image
              src={check}
              alt="check"
              className={
                isPasswordValid('minLength', formik.values.password) ? style.valid : style.invalid
              }
            />
            <p>Минимум 8 карактери</p>
          </div>
        </div>

        <label htmlFor="checkbox">
          <input type="checkbox" id="checkbox" />
          Се согласувам со сите Terms & Conditions
        </label>
        <div className={style.signUpBtn}>
          <Button
            href="www.google.com"
            type="submit"
            buttonClass={['primaryButton', 'smallFooterButton']}
            buttonText="Регистрирај се"
          />
        </div>
      </form>
      <div className={style.alternativeSignUp}>
        <span>или продолжи со</span>
        <div className={style.socialMediaSignUp}>
          <Link href="www.google.com" target="_blank" rel="noopener noreferrer">
            <Image src={github} alt="Github" />
          </Link>
          <Link href="www.google.com" target="_blank" rel="noopener noreferrer">
            <Image src={google} alt="Google" />
          </Link>
          <Link href="www.google.com" target="_blank" rel="noopener noreferrer">
            <Image src={linkedin} alt="Linkedin" />
          </Link>
        </div>
        <div className={style.haveAccount}>
          <p>Веќе имаш креиран профил? </p>
          <Button
            type="link"
            href="www.google.com"
            buttonTarget="_blank"
            buttonText="Најави се"
            buttonClass={['orangeLink']}
          />
        </div>
      </div>
    </div>
  );
};

export default ReusableForm;
