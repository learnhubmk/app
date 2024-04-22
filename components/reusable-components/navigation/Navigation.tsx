/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.scss';
import Button from '../button/Button';
// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/no-unresolved
import solImage from '../../../public/theme/sol.png';
// eslint-disable-next-line import/no-unresolved
import moonImage from '../../../public/theme/lune.png';
import { useTheme } from '../../../app/context/themeContext';

const Navigation = () => {
  const { isSun, handleClick } = useTheme();
  return (
    <nav className={styles.largeNavbar}>
      <div className={styles.navContainer}>
        <Link className={`display-s ${styles.navigationLogo}`} href="/">
          <Image
            src={isSun ? '/logo/logo-white.svg' : '/logo/logo-black.svg'}
            className={`${styles.navigationLogo}`}
            alt="LearnHub Logo"
            width={250}
            height={55}
          />
        </Link>

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
        <div
          className={`${styles.themeBackgroundSize} ${!isSun ? styles.themeDark && styles.themeBackgroundLight : styles.themeLight && styles.themeBackgroundDark}`}
          onClick={handleClick}
        >
          <div className={`${styles.animate} ${!isSun ? styles.moveRight : ''}`}>
            {' '}
            {isSun ? (
              <Image
                className={`${styles.theme_icon}`}
                src={solImage}
                alt="Sun"
                width={25}
                height={25}
              />
            ) : (
              <Image
                className={`${styles.theme_icon}`}
                src={moonImage}
                alt="Moon"
                width={25}
                height={25}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
