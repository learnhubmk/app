import React from 'react';
import Styles from '../../reusable-components/button/button.module.scss';

interface ButtonProps {
  OnClick: () => void;
  Children: React.ReactNode;
  ClassName?: string;
  BackgroundColor?: string;
  Color?: string;
  Border?: string;
  BorderRadius?: string;
}

function Button({
  OnClick,
  Children,
  ClassName = '',
  BackgroundColor = '',
  Color = '',
  Border = '',
  BorderRadius = '',
}: ButtonProps) {
  const ButtonStyles = {
    backgroundColor: BackgroundColor,
    color: Color,
    border: Border,
    borderRadius: BorderRadius,
  };

  return (
    <button
      type="button"
      className={`${Styles.Button} ${ClassName}`}
      style={ButtonStyles}
      onClick={OnClick}
    >
      {Children}
    </button>
  );
}

Button.defaultProps = {
  ClassName: '?',
  BackgroundColor: '?',
  Color: '?',
  Border: '?',
  BorderRadius: '?',
};

export default Button;
