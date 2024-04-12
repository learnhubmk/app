import React from 'react';
import styles from './newsletter.module.scss';
import EmailForm from './emailform/emailform';

const Newsletter: React.FC = () => {
  return (
    <div className={styles.newsletterContainer}>
      <div className={styles.contentContainer}>
        <p>Претплати се на нашиот</p>
      </div>
      <div className={styles.newsletterText}>
        <p>Newsletter</p>
        <span className={`${styles.ellipse} ${styles.ellipsePosition}`} />
        <div className={`${styles.newsletterSection} ${styles.inputContainer}`}>
          <EmailForm inputClassName={styles.newsletterSection} buttonClassName={styles.button} />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
