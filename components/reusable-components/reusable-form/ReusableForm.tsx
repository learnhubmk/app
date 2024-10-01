'use client';

import React, { useState } from 'react';
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
import { IPasswordValidation, IAuthFormProps } from '../_Types';
import { initialValues, validationSchema, handleSubmit } from '../login-form/formLogic';

const ReusableForm = () => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  const [passwordValidation, setPasswordValidation] = useState<IPasswordValidation>({
    uppercase: false,
    specialChar: false,
    minLength: false,
  });

  const formik: FormikProps<IAuthFormProps> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    formik.handleChange(e);
    setPasswordValidation(() => ({
      uppercase: /[A-Z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      minLength: value.length >= 8,
    }));
  };

  const getColor = (valid: boolean | null): string => {
    const colors = {
      null: '#475569',
      true: '#00B107',
      false: '#FF4045',
    };

    return colors[String(valid) as keyof typeof colors];
  };

  const ruleMessages: { [key in keyof IPasswordValidation]: string } & { default: string } = {
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
                <p>{ruleMessages[rule as keyof IPasswordValidation] || ruleMessages.default}</p>
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
