'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../../../app/context/themeContext';
import styles from './footer.module.scss';
import TextInput from '../text-input/TextInput';
import discord from '../../../public/icons-footer/discord.svg';
import linkedin from '../../../public/icons-footer/linkedIn.svg';
import github from '../../../public/icons-footer/github.svg';
import facebook from '../../../public/icons-footer/facebook.svg';
import instagram from '../../../public/icons-footer/instagram.svg';
import youtube from '../../../public/icons-footer/youtube.svg';
import logolight from '../../../public/logo/logo-white.svg';
import logodark from '../../../public/logo/logo-black.svg';

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
      // eslint-disable-next-line no-unused-vars
      .email('Невалидна емаил адреса')
      .required('Задолжително внесете емаил адреса'),
  });
  // eslint-disable-next-line no-unused-vars
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (values: { name: string; email: string }) => {
    try {
      // Simulating API call
      /*
      const response = await fetch('your-backend-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        setSuccessMessage(true);
      } else {
        setErrorMessage(true);
      }
      */
      // Simulating success
      setSuccessMessage(true);
      toast.success('Успешно испратено!');
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
    <footer className={`${styles.footerWrapper} `}>
      <div className={`${styles.footer} ${theme}`}>
        <form onSubmit={formik.handleSubmit}>
          <div className={`display-s ${styles.footerLogo}`}>
            <Image
              src={theme === 'light' ? logolight : logodark}
              alt="LearnHub Logo"
              width={208}
              height={48}
            />
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
                />
                <TextInput
                  placeholder="Enter your Email"
                  type="email"
                  label=""
                  name="email"
                  field="email"
                  formik={formik}
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
              <div className={styles.socialLinks}>
                <Link
                  href="https://discord.com/invite/nUEKUWVveW"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={discord} alt="Discord" width={48} height={48} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/102600044/admin/feed/posts/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={linkedin} alt="Linkedin" width={48} height={48} />
                </Link>
                <Link
                  href="https://github.com/learnhubmkd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={github} alt="Github" width={48} height={48} />
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCDDywMbRvBXuUFTPBORc-BQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={youtube} alt="Youtube" width={48} height={48} />
                </Link>
                <Link
                  href="https://www.instagram.com/learnhub.mk?fbclid=IwAR3bWgALMMaxnp4a9hbUvjXLBOdkWGHcopCsFpp6WyKRRFoMSOyWqVHLNdk_aem_AUc6U-6f2fR5ErfT3g8nroxbZOsFEXjSAh6n06NlfDHWJxvbc-R-DNQ5hJhYnOLCuIWEVpD017qq83l-VqU5y43A"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={instagram} alt="Instagram" width={48} height={48} />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61556614894387"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={facebook} alt="Facebook" width={48} height={48} />
                </Link>
              </div>
            </div>
          </div>
          <div className={`title-l ${styles.copyrightSection}`}>
            <p>&copy; 2024 Copyright by LearnHub. All rights reserved.</p>
          </div>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
