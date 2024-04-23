/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
