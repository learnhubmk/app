import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Button = ({ children, onClick = () => {}, className = '', style = {} }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
