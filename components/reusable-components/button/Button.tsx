import Link from 'next/link';

import Image from 'next/image';

import styles from './button.module.scss';
import setClass from '../../../utils/setClass';

interface ButtonProps {
  onClick?: () => void;
  type: string;
  buttonText: string;
  href: string;
  // eslint-disable-next-line no-undef
  icon?: JSX.Element;
  iconSrc?: string;
  buttonClass: string[];
  rotateIcon?: boolean;
  moveIcon?: boolean;
  buttonTarget?: string;
}

const Button = ({
  onClick,
  type,
  buttonText,
  href,
  icon,
  iconSrc,
  buttonClass,
  rotateIcon,
  moveIcon,
  buttonTarget,
}: ButtonProps) => {
  return (
    (type === 'button' && (
      <button
        type="button"
        className={`${styles.button} ${setClass(buttonClass, styles)}`}
        onClick={onClick}
      >
        {buttonText} {icon && <div>{icon}</div>}{' '}
        {iconSrc && (
          <div className={`${styles.iconContainer} ${moveIcon && styles.moveToRightIcon}`}>
            <Image src={iconSrc} alt="button icon" width={16} height={16} />
          </div>
        )}
      </button>
    )) ||
    (type === 'link' && (
      <Link
        href={href}
        className={`${styles.linkButton} ${setClass(buttonClass, styles)}`}
        target={buttonTarget}
      >
        {icon && (
          <div className={`${styles.iconContainer} ${rotateIcon && styles.rotateIcon}`}>{icon}</div>
        )}{' '}
        {buttonText}
      </Link>
    )) ||
    (type === 'cardButton' && (
      <div className={`${styles.linkButton} ${setClass(buttonClass, styles)}`}>
        {icon && (
          <div className={`${styles.iconContainer} ${rotateIcon && styles.rotateIcon}`}>{icon}</div>
        )}{' '}
        {buttonText}
      </div>
    )) ||
    (type === 'submit' && (
      <button type="submit" className={`${styles.button} ${setClass(buttonClass, styles)}`}>
        {buttonText} {icon && <div className={styles.iconContainer}>{icon}</div>}
      </button>
    ))
  );
};

export default Button;
