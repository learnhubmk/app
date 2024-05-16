'use client';

import { useTheme } from '../../../app/context/themeContext';
import style from './textArea.module.scss';

interface InputProps {
  placeholder: string;
  label: string;
  name: string;
  field: string;
  formik: any;
  isRequired?: boolean;
}

const TextArea = ({ placeholder, label, name, field, formik, isRequired }: InputProps) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const isError = formik.touched[field] && formik.errors[field] !== undefined && 'error';
  const isValid = !isError && formik.touched[field] && 'valid';

  return (
    <div className={style.textAreaContainer}>
      <label htmlFor={name} className={style.label}>
        {label} {isRequired && <span className={`${isLightTheme && style.errorColor}`}>*</span>}
      </label>
      <div className={style.textAreaWrapper}>
        <textarea
          className={`${style.textArea} ${style[`${isError}`]} ${style[`${isValid}`]}`}
          placeholder={placeholder}
          value={formik.values[field]}
          onChange={formik.handleChange}
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
        <div className={`${style.errorMessage} ${isLightTheme && style.errorColor}`}>
          {formik.errors[field]}
        </div>
      )}
    </div>
  );
};

export default TextArea;
