'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

import styles from './navigation.module.scss';
import Button from '../button/Button';

const Navigation = () => {
  return (
    <nav className={styles.largeNavbar}>
      <div className={styles.navContainer}>
        <Link className={`display-s ${styles.navigationLogo}`} href="/">
          <Image src="/logo/logo.svg" alt="LearnHub Logo" width={250} height={55} />
        </Link>
        <div id="navbarNav">
          <ul className={styles.menuElementsNav}>
            <Link className={`headline-s ${styles.menuElements}`} href="/">
              Визија{' '}
            </Link>
            <Link className={`headline-s ${styles.menuElements}`} href="/">
              {' '}
              Цели{' '}
            </Link>
            <Link className={`headline-s ${styles.menuElements}`} href="/">
              {' '}
              Контакт{' '}
            </Link>
            <Link className={`headline-s ${styles.menuElements}`} href="/blog">
              Блог{' '}
            </Link>
          </ul>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            type="link"
            buttonText="Регистрирај се"
            href="/signup"
            buttonClass={['primaryButton']}
          />

          <Button
            type="link"
            buttonText="Најави се"
            href="/login"
            buttonClass={['secondaryButton']}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
