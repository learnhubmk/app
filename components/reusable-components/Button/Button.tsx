import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
}  

function Button({ 
  onClick,
  children,
  className = '',
  backgroundColor = '',
  color = '',
  border = '',
  borderRadius = '',
}: ButtonProps) {
  const buttonStyles = {
    backgroundColor,
    color,
    border,
    borderRadius,
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      style={buttonStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '?',
  backgroundColor: '?',
  color: '?',
  border: '?',
  borderRadius: '?',
};

export default Button;
