import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './footer.module.scss';
import EmailForm from '../newsletter/emailform/emailform';

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={` display-s ${styles.footerLogo}`}>
        <p>LearnHub.mk</p>
      </div>

      <div className={`title-l ${styles.contactSection}`}>
        <p>CONTACT</p>
        <a href="mailto:contact@learnhub.mk">contact@learnhub.mk</a>
      </div>

      <div className={` title-l ${styles.socialMediaSection}`}>
        <p>SOCIAL MEDIA</p>
        <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> Linkedin
        </Link>
        <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebook /> Facebook
        </Link>
        <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <FaInstagram /> Instagram
        </Link>
        <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <FaYoutube /> Youtube
        </Link>
      </div>

      <div className={` title-l ${styles.newsletterSection}`}>
        <p>NEWSLETTER</p>
        <div className={`${styles.inputContainer}`}>
          <EmailForm inputClassName={styles.newsletterSection} buttonClassName={styles.button} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
