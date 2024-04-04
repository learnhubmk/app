'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.scss';
import Button from '../button/Button';

const Navigation = () => {
  return (
    <nav className={styles.largeNavbar}>
      <div className={styles.navContainer}>
        <Link className={`display-s ${styles.navigationLogo}`} href="/">
          <Image src="/logo/logoAnimated.svg" alt="LearnHub Logo" width={250} height={55} />
          <Image src="/logo/logomarkAnimated.svg" alt="LearnHub Logo" width={55} height={55} />
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
        <div className={styles.buttonsContent}>
          <div>
            <Link href="/signup" passHref>
              <Button
                style={{
                  backgroundColor: 'var(--bg-color)',
                  padding: '10px',
                  marginRight: '10px',
                  color: '#ea713e',
                  border: '1px solid #ea713e',
                  fontSize: '20px',
                  paddingInline: '25px',
                }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/signin" passHref>
              <Button
                style={{
                  backgroundColor: '#f9664b',
                  padding: '10px',
                  fontSize: '20px',
                  paddingInline: '25px',
                }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
