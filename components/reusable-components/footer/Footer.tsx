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
import logodark from '../../../public/logo/logo-black.svg';
import SocialMediaLinks from './SocialMediaIcons';

// eslint-disable-next-line no-unused-vars
interface FormValues {
  name: string;
  email: string;
}

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const initialValues = { name: '', email: '' };
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z .'-]+$/, 'Невалидно име!')
      .min(2, 'Вашето име е премногу кратко!')
      .max(50, 'Вашето име е премногу долго!')
      .required('Задолжително внесете име'),
    email: Yup.string()
      .email('Невалидна емаил адреса')
      .required('Задолжително внесете емаил адреса'),
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
      className={`${styles.footerWrapper} ${theme === 'light' ? styles.lightBackground : styles.darkBackground}`}
    >
      <div
        className={`${styles.footer} ${theme === 'light' ? styles.lightBackground : styles.darkBackground}`}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className={`display-s ${styles.footerLogo}`}>
            <Image src={logodark} alt="LearnHub Logo" width={208} height={48} />
          </div>

          <div className={`${styles.middleSection}`}>
            <div className={`title-l ${styles.newsletterSection}`}>
              <p>Subscribe to our newsletter</p>
              <div className={`${styles.inputContainer}`}>
                <TextInput
                  placeholder="Enter your Name"
                  type="text"
                  label=""
                  name="name"
                  field="name"
                  formik={formik}
                  isFooter
                />
                <TextInput
                  placeholder="Enter your Email"
                  type="email"
                  label=""
                  name="email"
                  field="email"
                  formik={formik}
                  isFooter
                />
                <button type="submit" className={`${styles.Button}`} disabled={formik.isSubmitting}>
                  Submit
                </button>
              </div>
            </div>

            <div className={`title-l ${styles.contactSection}`}>
              <p>Contact us at</p>
              <a href="mailto:contact@learnhub.mk">contact@learnhub.mk</a>
            </div>

            <div className={`title-l ${styles.socialMediaSection}`}>
              <p>Connect with us</p>
              <SocialMediaLinks />
            </div>
          </div>
          <div className={`title-l ${styles.copyrightSection}`}>
            <p>&copy; 2024 Copyright by LearnHub. All rights reserved.</p>
          </div>

          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
            onVerify={(token) => setTurnstileToken(token)}
            theme="light"
            size="invisible"
          />
        </form>
      </div>
    </footer>
  );
};

export default Footer;
