import Link from 'next/link';

import styles from './button.module.scss';

interface ButtonProps {
  // children: React.ReactNode;
  onClick?: () => void;
  type: string;
  buttonText: string;
  href: string;
  // eslint-disable-next-line no-undef
  icon?: JSX.Element;
  buttonClass: string;
}

const Button = ({
  // children,
  onClick = () => {},
  type,
  buttonText,
  href,
  icon,
  buttonClass,
}: ButtonProps) => {
  return (
    (type === 'button' && (
      <button
        type="button"
        className={`${buttonClass === 'primaryButton' ? styles.primaryButton : styles.secondaryButton}`}
        onClick={onClick}
      >
        {buttonText} {icon && <div>{icon}</div>}
      </button>
    )) ||
    (type === 'link' && (
      <Link
        href={href}
        className={`${buttonClass === 'primaryButton' ? styles.primaryButton : styles.secondaryButton}`}
      >
        {buttonText} {icon && <div>{icon}</div>}
      </Link>
    ))
  );
};

export default Button;
