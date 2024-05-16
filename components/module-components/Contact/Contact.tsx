'use client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import style from './contact.module.scss';
import CaptchaWidget from '../../reusable-components/turnstile-captcha/CaptchaWidget';
import { useTheme } from '../../../app/context/themeContext';
import ContactForm from './ContactForm';
import Button from '../../reusable-components/button/Button';

const handleCaptchaSuccess = () => {};

const handleCaptchaError = () => {};

const Contact = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <section
      className={`${style.contactSection} ${isLightTheme ? style.lightContactSection : style.darkContactSection}`}
    >
      <div className={style.contact}>
        <div className={style.contactLeftContainer}>
          <div className={style.leftTextContainer}>
            <h2>Кажи ни повеќе за тебе</h2>
            <p className={style.leftText}>
              Have some big idea or brand to develop and need help? Then reach out we'd love to hear
              about your project and provide help
            </p>
          </div>
          <ContactForm cfTurnstileResponse="cfTurnstilerResponse" />
          <CaptchaWidget onSuccess={handleCaptchaSuccess} onError={handleCaptchaError} />
        </div>
        <div className={style.contactRightContainer}>
          <h2>Стани член на Discord</h2>
          <Button
            href="/https://discord.com/invite/nUEKUWVveW"
            type="link"
            buttonText="Придружи се"
            buttonClass={['motionButton', 'orangeLink']}
            icon={<i className="bi bi-arrow-up-right-circle-fill" />}
            rotateIcon
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
