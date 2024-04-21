import React from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
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
            href="https://www.linkedin.com/company/102600044/admin/feed/posts/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin" /> Linkedin
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61556614894387"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook" /> Facebook
          </Link>
          <Link
            href="https://www.instagram.com/learnhub.mk?fbclid=IwAR3bWgALMMaxnp4a9hbUvjXLBOdkWGHcopCsFpp6WyKRRFoMSOyWqVHLNdk_aem_AUc6U-6f2fR5ErfT3g8nroxbZOsFEXjSAh6n06NlfDHWJxvbc-R-DNQ5hJhYnOLCuIWEVpD017qq83l-VqU5y43A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram" /> Instagram
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCDDywMbRvBXuUFTPBORc-BQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-youtube" /> Youtube
          </Link>
          <Link
            href="https://discord.com/invite/nUEKUWVveW"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-discord" /> Discord
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
