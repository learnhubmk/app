import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaDiscord } from 'react-icons/fa';
import styles from './footer.module.scss';
import EmailForm from '../newsletter/emailform/emailform';

const Footer = () => {
  return (
    <footer className={`${styles.footerWrapper}`}>
      <div className={`${styles.footer}`}>
        <div className={` display-s ${styles.footerLogo}`}>
          <Image src="/logo/logo.svg" alt="LearnHub Logo" width={250} height={55} />
        </div>

        <div className={`title-l ${styles.contactSection}`}>
          <p>CONTACT</p>
          <a href="mailto:contact@learnhub.mk">contact@learnhub.mk</a>
        </div>

        <div className={` title-l ${styles.socialMediaSection}`}>
          <p>SOCIAL MEDIA</p>
          <Link
            href="https://www.linkedin.com/company/learnhubmk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> Linkedin
          </Link>
          <Link
            href="https://www.facebook.com/people/LearnHubmk/61556614894387/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook /> Facebook
          </Link>
          <Link
            href="https://www.instagram.com/learnhub.mk/?fbclid=IwAR3bWgALMMaxnp4a9hbUvjXLBOdkWGHcopCsFpp6WyKRRFoMSOyWqVHLNdk_aem_AUc6U-6f2fR5ErfT3g8nroxbZOsFEXjSAh6n06NlfDHWJxvbc-R-DNQ5hJhYnOLCuIWEVpD017qq83l-VqU5y43A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram /> Instagram
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCDDywMbRvBXuUFTPBORc-BQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube /> Youtube
          </Link>
          <Link
            href="https://discord.com/invite/nUEKUWVveW"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord /> Discord
          </Link>
        </div>

        <div className={` title-l ${styles.newsletterSection}`}>
          <p>NEWSLETTER</p>
          <div className={`${styles.inputContainer}`}>
            <EmailForm inputClassName={styles.newsletterSection} buttonClassName={styles.button} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
