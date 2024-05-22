/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

import styles from './navigation.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import sunImage from '../../../public/theme/sun.png';
import moonImage from '../../../public/theme/moon.png';
import LogoNavigation from '../../../public/logo/logo-black.svg';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const isSun = theme === 'light';

  return (
    <nav className={`${styles.navigation} ${isSun && styles.lightNavigation}`}>
      <div className={styles.navigationContainer}>
        <Link className={styles.navigationLogoLink} href="/">
          <Image src={LogoNavigation} className={styles.navigationLogo} alt="LearnHub Logo" />
        </Link>
        <div className={styles.toggleContainer} onClick={toggleTheme}>
          <div className={`${styles.animate} ${!isSun ? styles.moveRight : ''}`}>
            <div className={`${styles.toggleButton} ${isSun && styles.marginLeftButton}`} />
          </div>

          {isSun ? (
            <Image
              src={moonImage}
              alt="moon icon"
              width={18}
              height={18}
              className={styles.moonImage}
            />
          ) : (
            <Image
              src={sunImage}
              alt="sun icon"
              width={18}
              height={18}
              className={styles.sunImage}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
