/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */

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
import CheckPasswordValidityIcon from '../CheckPasswordValidityIcon/CheckPasswordValidityIcon';
import { useTheme } from '../../../app/context/themeContext';

interface PasswordValidation {
  uppercase: boolean | null;
  specialChar: boolean | null;
  minLength: boolean | null;
}

const ReusableForm = () => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    uppercase: null,
    specialChar: null,
    minLength: null,
  });

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
    onSubmit: (values) => {
      setPasswordValidation({
        uppercase: /[A-Z]/.test(values.password) ? true : false,
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(values.password) ? true : false,
        minLength: values.password.length >= 8 ? true : false,
      });
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.handleChange(e);
    const newChange = {
      uppercase: /[A-Z]/.test(value) ? true : null,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value) ? true : null,
      minLength: value.length >= 8 ? true : null,
    };
    setPasswordValidation((prevState) => ({
      ...prevState,
      ...newChange,
    }));
  };

  const getColor = (valid: boolean | null) => {
    return valid === null ? '#475569' : valid ? '#00B107' : '#FF4045';
  };

  const ruleMessages: { [key in keyof PasswordValidation]: string } & { default: string } = {
    uppercase: 'Една голема буква',
    specialChar: 'Еден специјален знак или симбол',
    minLength: 'Минимум 8 карактери',
    default: 'Невалидно правило',
  };

  return (
    <div
      className={`${style.reusableFormWrapper} ${lightTheme ? style.lightFormWrapper : style.darkFormWrapper}`}
    >
      <h2 className={style.formTitle}>Регистрирај се</h2>
      <form className={style.reusableForm} onSubmit={formik.handleSubmit}>
        <TextInput
          placeholder="Внесете го вашето име"
          type="text"
          label="Име *"
          name="firstName"
          field="firstName"
          formik={formik}
        />
        <TextInput
          placeholder="Внесете го вашето презиме"
          type="text"
          label="Презиме *"
          name="lastName"
          field="lastName"
          formik={formik}
        />
        <TextInput
          placeholder="Внесете ја вашата електронска пошта"
          type="email"
          label="Електронска пошта *"
          name="email"
          field="email"
          formik={formik}
        />
        <TextInput
          placeholder="Внесете ја вашата лозинка"
          type="password"
          label="Лозинка *"
          name="password"
          field="password"
          formik={formik}
          onChange={handlePasswordChange}
        />
        <div className={style.requirements}>
          {Object.entries(passwordValidation).map(([rule, valid]) => (
            <div className={style.requirementsItem} key={rule}>
              <CheckPasswordValidityIcon color={getColor(valid)} />
              <p>
                <p>{ruleMessages[rule as keyof PasswordValidation] || ruleMessages.default}</p>
              </p>
            </div>
          ))}
        </div>

        <label htmlFor="checkbox">
          <input type="checkbox" id="checkbox" required />
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
