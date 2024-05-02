'use client';

import React, { FC, HTMLProps } from 'react';
import style from './textInput.module.scss';

interface InputProps extends HTMLProps<HTMLInputElement> {
  placeholder: string;
  label: string;
  name: string;
  type: string;
  field: string;
  formik: any;
}

const TextInput: FC<InputProps> = ({ placeholder, label, name, type, field, formik }) => {
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
