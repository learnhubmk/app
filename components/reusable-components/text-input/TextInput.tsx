'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { FC, HTMLProps } from 'react';
import style from './textInput.module.scss';

interface InputProps extends HTMLProps<HTMLInputElement> {
  placeholder: string;
  label: string;
  name: string;
}

const TextInput: FC<InputProps> = ({ placeholder, label, name }) => {
  const inputRegex = /^[\u0400-\u04FFа-џA-Za-z-]+$/;

  const formik = useFormik({
    initialValues: { [name]: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Полето е задолжително')
        .matches(
          inputRegex,
          '*Дозволени се следните карактери.... името може да биде на кирилица и латиница'
        ),
    }),
    onSubmit: () => {},
  });
  const isError = formik.touched[name] && formik.errors[name];
  const isValid = !isError && formik.touched[name];
  return (
    <div className={style.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <div className={style.inputWrapper}>
        <input
          type="text"
          className={`${style.input} ${isError ? style.error : style.valid}`}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={name}
        />
        {formik.values[name] && isError && (
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

      {isError && <div className={style.errorMessage}>{formik.errors[name]}</div>}
    </div>
  );
};

export default TextInput;
