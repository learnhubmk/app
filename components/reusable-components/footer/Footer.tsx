import React from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
          <i className="bi bi-linkedin" /> Linkedin
        </Link>
        <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-facebook" /> Facebook
        </Link>
        <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram" /> Instagram
        </Link>
        <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-youtube" /> Youtube
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
