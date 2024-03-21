import React from 'react';
import style from './input.module.scss';

interface InputProps {
  type: string;
  placeholder: string;
  icon: React.JSX.Element;
}

const Input = ({ type, placeholder, icon }: InputProps) => {
  return (
    <div>
      <div className={style.inputWrapp}>
        <div className={style.inputContainer}>
          {icon && <div className={style.inputIcon}>{icon}</div>}
          <input className={style.input} type={type} placeholder={placeholder} />
        </div>
      </div>
    </div>
  );
};

export default Input;
