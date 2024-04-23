/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import solImage from '../../../public/theme/sun.png';
import moonImage from '../../../public/theme/moon.png';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const isSun = theme === 'light';

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

        <div
          className={`${styles.themeBackgroundSize} ${!isSun ? styles.themeDark && styles.themeBackgroundLight : styles.themeLight && styles.themeBackgroundDark}`}
          onClick={toggleTheme}
        >
          <div className={`${styles.animate} ${!isSun ? styles.moveRight : ''}`}>
            {isSun ? (
              <div className={`${styles.ellipse1} ${styles.ellipse}`} />
            ) : (
              <div className={`${styles.ellipse} ${styles.ellipse1}`} />
            )}
          </div>

          {isSun ? (
            <Image
              src={moonImage}
              alt="Sun Image"
              width={18}
              height={18}
              className={styles.customImageClass}
            />
          ) : (
            <Image
              src={solImage}
              alt="Moon Image"
              width={18}
              height={18}
              className={styles.customImageClass1}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
