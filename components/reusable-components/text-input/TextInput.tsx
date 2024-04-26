'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { FC, HTMLProps } from 'react';
import style from './textInput.module.scss';

interface InputProps extends HTMLProps<HTMLInputElement> {
  placeholder: string;
  label: string;
  name: string;
  type: string;
  field: string;
}

const TextInput: FC<InputProps> = ({ placeholder, label, name, type, field }) => {
  const inputRegex = /^[\u0400-\u04FFа-џA-Za-z-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^\d+$/;

  const formik = useFormik({
    initialValues: {
      [field]: '',
    },
    validationSchema: Yup.object().shape({
      name:
        field === 'name'
          ? Yup.string()
              .required('Полето е задолжително')
              .matches(
                inputRegex,
                '*Дозволени се следните карактери.... името може да биде на кирилица и латиница'
              )
          : Yup.string(),
      email:
        field === 'email'
          ? Yup.string()
              .required('Полето е задолжително')
              .matches(emailRegex, '*Внесете правилен маил')
          : Yup.string(),
      numberField:
        field === 'number'
          ? Yup.string().required('Полето е задолжително').matches(numberRegex)
          : Yup.string(),
    }),
    onSubmit: () => {},
  });

  const isError = formik.touched[field] && formik.errors[field];
  const isValid = !isError && formik.touched[field];
  return (
    <div className={style.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <div className={style.inputWrapper}>
        <input
          type={type}
          className={`${style.input} ${isError ? style.error : style.valid}`}
          placeholder={placeholder}
          value={formik.values[field]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={name}
        />
        {formik.values[field] && isError && (
          <div className={style.errorIcon}>
            {' '}
            <i className="bi bi-x-circle-fill" />
          </div>
        )}

        {isValid && (
          <div className={style.validIcon}>
            <i className="bi bi-check-circle-fill" />
          </div>
        )}
      </div>

      {isError && <div className={style.errorMessage}>{formik.errors[field]}</div>}
    </div>
  );
};

export default TextInput;
