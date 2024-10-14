'use client';

import React, { FC } from 'react';
import style from './textInput.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import setClass from '../../../utils/setClass';
import { InputProps } from '../../../_Types/types';

const TextInput: FC<InputProps> = ({
  placeholder,
  label,
  name,
  type,
  field,
  formik,
  isRequired,
  isFooter,
  inputClass = [],
  onChange,
}) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const isError = formik.touched[field] && formik.errors[field] !== undefined && 'error';
  const isValid = !isError && formik.touched[field] && 'valid';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={style.inputContainer}>
      <label htmlFor={name} className={style.label}>
        {label} {isRequired && <span className={`${isLightTheme && style.errorColor}`}>*</span>}
      </label>
      <div className={style.inputWrapper}>
        <input
          type={type}
          className={`${style.input} ${setClass(inputClass, style)} ${style[`${isError}`]} ${style[`${isValid}`]}`}
          placeholder={placeholder}
          value={formik.values[field]}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          name={name}
        />
        {formik.values[field] && isError && (
          <div className={style.errorIcon}>
            <i className="bi bi-x-circle-fill" />
          </div>
        )}

        {isValid && (
          <div className={style.validIcon}>
            <i className="bi bi-check-circle-fill" />
          </div>
        )}
      </div>

      {isError && (
        <div className={`${style.errorMessage} ${isFooter && style.footerErrorMessage}`}>
          {formik.errors[field]}
        </div>
      )}
    </div>
  );
};

export default TextInput;
