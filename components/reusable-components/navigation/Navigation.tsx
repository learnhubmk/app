/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.scss';
import Button from '../button/Button';
import solImage from '../../../public/theme/sol.png';
import moonImage from '../../../public/theme/lune.png';
import { useTheme } from '../../../app/context/themeContext';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <nav className={styles.largeNavbar}>
      <div className={styles.navContainer}>
        <Link className={`display-s ${styles.navigationLogo}`} href="/">
          <Image
            src={isLightTheme ? '/logo/logo-white.svg' : '/logo/logo-black.svg'}
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

          <div
            className={`${styles.themeBackgroundSize} ${!isLightTheme ? styles.themeDark && styles.themeBackgroundLight : styles.themeLight && styles.themeBackgroundDark}`}
            onClick={toggleTheme}
          >
            <div className={`${styles.animate} ${!isLightTheme ? styles.moveRight : ''}`}>
              {isLightTheme ? (
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
      </div>
    </nav>
  );
};

export default Navigation;
