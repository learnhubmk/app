import Link from 'next/link';

import styles from './button.module.scss';
import setClass from '../../../utils/setClass';

interface ButtonProps {
  onClick?: () => void;
  type: string;
  buttonText: string;
  href: string;
  // eslint-disable-next-line no-undef
  icon?: JSX.Element;
  buttonClass: string[];
  rotateIcon?: boolean;
}

const Button = ({
  onClick,
  type,
  buttonText,
  href,
  icon,
  buttonClass,
  rotateIcon,
}: ButtonProps) => {
  return (
    (type === 'button' && (
      <button
        type="button"
        className={`${styles.button} ${setClass(buttonClass, styles)}`}
        onClick={onClick}
      >
        {buttonText} {icon && <div>{icon}</div>}
      </button>
    )) ||
    (type === 'link' && (
      <Link href={href} className={`${styles.linkButton} ${setClass(buttonClass, styles)}`}>
        {icon && <div className={`${rotateIcon && styles.rotateIcon}`}>{icon}</div>} {buttonText}
      </Link>
    )) ||
    (type === 'cardButton' && (
      <div className={`${styles.linkButton} ${setClass(buttonClass, styles)}`}>
        {icon && <div className={`${rotateIcon && styles.rotateIcon}`}>{icon}</div>} {buttonText}
      </div>
    ))
  );
};

export default Button;
