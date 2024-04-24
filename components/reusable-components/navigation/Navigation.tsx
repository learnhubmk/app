/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
        <div className={styles.buttonsContainer}>
          <Link href="/signup">
            <Button
              type="button"
              buttonText="Регистрирај се"
              href=""
              buttonClass={['primaryButton']}
            />
          </Link>
          <Link href="/login">
            <Button
              type="button"
              buttonText="Најави се"
              href=""
              buttonClass={['secondaryButton']}
            />
          </Link>
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
