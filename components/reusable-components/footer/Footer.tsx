'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Turnstile from 'react-turnstile';
import { useTheme } from '../../../app/context/themeContext';
// eslint-disable-next-line no-unused-vars
import { submitNewsletterForm } from './SubmitNewsletterForm';
import styles from './footer.module.scss';
import TextInput from '../text-input/TextInput';
import LogoDark from '../../../public/logo/logo-black.svg';
import SocialMediaLinks from './SocialMediaIcons';
import Button from '../button/Button';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isThemeLight = theme === 'light';

  const initialValues = { name: '', email: '' };
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z .'-]+$/, '*Невалидно име!')
      .min(2, '*Вашето име е премногу кратко!')
      .max(50, '*Вашето име е премногу долго!')
      .required('*Задолжително внесете име'),
    email: Yup.string()
      .email('*Невалидна емаил адреса')
      .required('*Задолжително внесете емаил адреса'),
  });
  // eslint-disable-next-line no-unused-vars
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (
    values: { name: string; email: string },
    { resetForm }: FormikHelpers<{ name: string; email: string }>
  ) => {
    if (!turnstileToken) {
      toast.error('Please complete the captcha');
      return;
    }

    const formValues = {
      ...values,
      turnstileToken,
    };

    try {
      await submitNewsletterForm(formValues);
      setSuccessMessage(true);
      toast.success('Успешно испратено!');
      resetForm();
    } catch (error) {
      setErrorMessage(true);
      toast.error('Грешка');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <footer
      className={`${styles.footer} ${theme === 'light' ? styles.lightBackground : styles.darkBackground}`}
    >
      <div className={styles.footerContainer}>
        <Image src={LogoDark} alt="LearnHub Logo" className={styles.footerLogo} />
        <div className={styles.footerSectionsContainer}>
          <div className={styles.newsletterContainer}>
            <h2 className={styles.footerTitle}>Претплати се на нашиот...</h2>
            <form className={styles.newsletterForm} onSubmit={formik.handleSubmit}>
              <TextInput
                placeholder="Enter your Name"
                type="text"
                label=""
                name="name"
                field="name"
                formik={formik}
                inputClass={[
                  'newsletterInput',
                  `${isThemeLight ? 'lightNewsletterInput' : 'darkNewsletterInput'}`,
                ]}
                isFooter
              />
              <TextInput
                placeholder="Enter your Email"
                type="email"
                label=""
                name="email"
                field="email"
                formik={formik}
                inputClass={[
                  'newsletterInput',
                  `${isThemeLight ? 'lightNewsletterInput' : 'darkNewsletterInput'}`,
                ]}
                isFooter
              />
              <Button
                href=""
                type="submit"
                buttonClass={['primaryButton', 'smallFooterButton']}
                buttonText="Претплати се"
              />
              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE || ''}
                onVerify={(token) => setTurnstileToken(token)}
                size="invisible"
              />
            </form>
          </div>
          <div className={styles.contactContainer}>
            <h2 className={styles.footerTitle}>Контактирај не</h2>
            <a className={styles.contactEmail} href="mailto:contact@learnhub.mk">
              contact@learnhub.mk
            </a>
          </div>
          <div className={styles.socialMediaContainer}>
            <h2 className={`${styles.footerTitle} ${styles.socialMediaTitle}`}>Connect with us</h2>
            <SocialMediaLinks />
          </div>
        </div>
        <div className={styles.copyrightContainer}>
          <p>&copy; 2024 Copyright by LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
