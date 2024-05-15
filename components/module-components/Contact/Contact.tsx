'use client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import style from './contact.module.scss';
// import CaptchaWidget from '../../reusable-components/turnstile-captcha/CaptchaWidget';
import { useTheme } from '../../../app/context/themeContext';
import ContactForm from './ContactForm';
import Button from '../../reusable-components/button/Button';

// const handleCaptchaSuccess = () => {};

// const handleCaptchaError = () => {};

const Contact = () => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  return (
    <section
      className={`${style.contactSection} ${lightTheme ? style.lightContactSection : style.darkContactSection}`}
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
          <ContactForm
            inputClassName={style.contactInput}
            textareaClassName={style.contactTextArea}
            cfTurnstileResponse="cfTurnstilerResponse"
            labelClassName={`${style.contactLabel} ${lightTheme ? style.contactLightLabel : style.contactDarkLabel}`}
          />
        </div>
        <div className={style.contactRightContainer}>
          <h2>Стани член на Discord</h2>
          <Button
            href="/https://discord.com/invite/nUEKUWVveW"
            type="link"
            buttonText="Придружи се"
            buttonClass={[`${lightTheme && 'lightLink'}`]}
            icon={<i className="bi bi-arrow-right-circle-fill" />}
          />
        </div>
      </div>
      {/* Section */}
      {/* <div className={`${style.contactContainer} ${theme}`}>
        <div>
          <p className={style.contactTitle}>Контактирај нé</p>
        </div>
        <div className={style.contactSection}>
          <ContactForm
            inputClassName={style.contactSection}
            buttonClassName={style.button}
            textareaClassName={style.textarea}
            cfTurnstileResponse="cfTurnstileResponse"
          />
          <CaptchaWidget onSuccess={handleCaptchaSuccess} onError={handleCaptchaError} />
        </div>
      </div> */}
    </section>
  );
};

export default Contact;
