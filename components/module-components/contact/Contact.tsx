'use client';

import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import style from './contact.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import ContactForm from './ContactForm';
import Button from '../../reusable-components/button/Button';
import ContactImageDesktop from '../../../public/contact-section-image-desktop.png';
import ContactImageMobile from '../../../public/contact-section-image-mobile.png';

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
            <h2>Имаш прашања или идеи за соработка?</h2>
            <p className={style.leftText}>
              Слободно контактирај не и ќе ти одговориме во најбрз можен рок.
            </p>
          </div>
          <ContactForm />
        </div>
        <div className={style.contactRightContainer}>
          <h2>Стани член на Discord</h2>
          <Button
            type="link"
            href="https://discord.com/invite/nUEKUWVveW"
            buttonTarget="_blank"
            buttonText="Придружи се"
            buttonClass={['motionButton', 'orangeLink']}
            icon={<i className="bi bi-arrow-up-right-circle-fill" />}
            rotateIcon
          />
        </div>
      </div>

      <Image
        src={ContactImageDesktop}
        className={`${style.contactImage} ${style.desktop}`}
        alt="contact picture desktop"
        priority
      />

      <Image
        src={ContactImageMobile}
        className={`${style.contactImage} ${style.mobile}`}
        alt="contact picture mobile"
        priority
      />
    </section>
  );
};

export default Contact;
