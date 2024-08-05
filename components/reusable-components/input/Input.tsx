'use client';

import React from 'react';
import style from './input.module.scss';

interface InputProps {
  type: string;
  placeholder: string;
  icon?: React.JSX.Element;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Input = ({ type, placeholder, icon, value, onChange, className }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={style.inputWrapp}>
      <div className={style.inputContainer}>
        {icon && <div className={style.inputIcon}>{icon}</div>}
        <input
          className={`${style.input} ${className || ''}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Input;
