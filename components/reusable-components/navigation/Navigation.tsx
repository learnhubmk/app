/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-duplicates
import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.scss';
import Button from '../button/Button';
import { useTheme } from '../../context/ThemeContext';
// eslint-disable-next-line import/no-unresolved
import solImage from '../../../public/sol.png';
// eslint-disable-next-line import/no-unresolved
import moonImage from '../../../public/lune.png';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSun, setIsSun] = useState(true);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  useEffect(() => {
    const storedIsSun = localStorage.getItem('isSun');
    if (storedIsSun !== null) {
      setIsSun(storedIsSun === 'true');
    }
  }, []);
  const handleClick = () => {
    toggleTheme();
    setIsSun((prevIsSun) => {
      const newIsSun = !prevIsSun;
      localStorage.setItem('isSun', String(newIsSun));
      return newIsSun;
    });
  };

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
            <Link className={`headline-s ${styles.menuElements}`} href="/">
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
        <div
          className={`${styles.themeBackgroundSize} ${!isSun ? styles.themeLight && styles.themeBackgroundLight : styles.themeDark && styles.themeBackgroundDark} `}
          onClick={handleClick}
        >
          <div className={`${styles.animate} ${!isSun ? styles.moveRight : ''}`}>
            {' '}
            {isSun ? (
              <Image src={solImage} alt="Sun" width={35} height={35} />
            ) : (
              <Image src={moonImage} alt="Moon" width={35} height={35} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
