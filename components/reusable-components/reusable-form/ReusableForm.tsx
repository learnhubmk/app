'use client';

import React from 'react';
import { useFormik, FormikProps } from 'formik';
import Link from 'next/link';
import Image from 'next/image';
import style from './reusableForm.module.scss';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import { useTheme } from '../../../app/context/themeContext';
import { ReusableFormProps } from '../../../Types';

const ReusableForm: React.FC<ReusableFormProps> = ({
  title,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  submitButtonText,
  socialLinks,
  alternativeActionText,
  alternativeActionLink,
  alternativeActionLinkText,
}) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  const formik: FormikProps<any> = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div
      className={`${style.reusableFormWrapper} ${lightTheme ? style.lightFormWrapper : style.darkFormWrapper}`}
    >
      <h2 className={style.formTitle}>{title}</h2>
      <form className={style.reusableForm} onSubmit={formik.handleSubmit}>
        {fields.map((field) => (
          <TextInput
            key={field.name}
            placeholder={field.placeholder}
            type={field.type}
            label={field.label}
            name={field.name}
            field={field.name}
            formik={formik}
          />
        ))}
        <div className={style.submitButton}>
          <Button
            type="submit"
            buttonClass={['primaryButton', 'smallFooterButton']}
            buttonText={submitButtonText}
          />
        </div>
      </form>
      {socialLinks && (
        <div className={style.alternativeSignUp}>
          <span>или продолжи со</span>
          <div className={style.socialMediaSignUp}>
            {socialLinks.map((link) => (
              <Link key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                <Image src={link.icon} alt={link.alt} />
              </Link>
            ))}
          </div>
        </div>
      )}
      {alternativeActionText && alternativeActionLink && alternativeActionLinkText && (
        <div className={style.alternativeAction}>
          <p>{alternativeActionText}</p>
          <Button
            type="link"
            href={alternativeActionLink}
            buttonTarget="_blank"
            buttonText={alternativeActionLinkText}
            buttonClass={['orangeLink']}
          />
        </div>
      )}
    </div>
  );
};

export default ReusableForm;
