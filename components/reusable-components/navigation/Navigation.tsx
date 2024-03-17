'use client';

import React from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';
import Button from '../button/Button';

const Navigation = () => {
  return (
    <nav className={styles.largeNavbar}>
      <div className={styles.navContainer}>
        <div className={styles.leftContent}>
          <Link className={`display-s ${styles.navbarBrand}`} href="/">
            LearnHub.mk
          </Link>
          <div id="navbarNav">
            <ul className={styles.horizontalNav}>
              <Link className={`headline-s ${styles.navLink1}`} href="/">
                Визија{' '}
              </Link>
              <Link className={`headline-s ${styles.navLink1}`} href="/">
                {' '}
                Цели{' '}
              </Link>
              <Link className={`headline-s ${styles.navLink1}`} href="/">
                {' '}
                Контакт{' '}
              </Link>
              <Link className={`headline-s ${styles.navLink1}`} href="/">
                Блог{' '}
              </Link>
            </ul>
          </div>
        </div>
        <div className={styles.rightContent}>
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
                  backgroundColor: '#ea713e',
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
