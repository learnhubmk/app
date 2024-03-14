import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import Styles from './footer.module.scss';

function Footer() {
  return (
    <footer className={Styles.Footer}>
      <div className={Styles.LeftSection}>
        <p>LearnHub.mk</p>
      </div>

      <div className={Styles.ContactSection}>
        <p>CONTACT</p>
        <p>contact@learnhub.mk</p>
      </div>

      <div className={Styles.SocialMediaSection}>
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

      <div className={Styles.NewsletterSection}>
        <p>NEWSLETTER</p>
        <input type="email" placeholder="Enter your email" />
        <button type="button"> → </button>
      </div>
    </footer>
  );
}

export default Footer;
