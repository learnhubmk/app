import Link from 'next/link';

import styles from './button.module.scss';
import setClass from '../../../utils/setClass';
// import setClass from '../../../utils/setClass';

interface ButtonProps {
  // children: React.ReactNode;
  onClick?: () => void;
  type: string;
  buttonText: string;
  href: string;
  // eslint-disable-next-line no-undef
  icon?: JSX.Element;
  buttonClass: string[];
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
  // const combinedClasses = buttonClass.map((className) => styles[className]).join(' ');
  return (
    (type === 'button' && (
      <button type="button" className={setClass(buttonClass, styles)} onClick={onClick}>
        {buttonText} {icon && <div>{icon}</div>}
      </button>
    )) ||
    (type === 'link' && (
      <Link href={href} className={setClass(buttonClass, styles)}>
        {buttonText} {icon && <div>{icon}</div>}
      </Link>
    ))
  );
};

export default Button;
