/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// eslint-disable-next-line import/no-duplicates
import Link from 'next/link';
import styles from './navigation.module.scss';
import Button from '../button/Button';
import { useTheme } from '../../context/ThemeContext';
// eslint-disable-next-line import/no-unresolved
import solImage from '../../../public/sol.png';
// eslint-disable-next-line import/no-unresolved
import moonImage from '../../../public/lune.png';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSun, setIsSun] = useState(true); // State to track whether it's sun or moon

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleClick = () => {
    toggleTheme(); // Toggle the theme
    setIsSun((prevIsSun) => !prevIsSun); // Toggle between sun and moon
  };

  return (
    <nav className={styles.largeNavbar}>
      <div className={styles.navContainer}>
        <div className={styles.leftContent}>
          <Link className={`display-s ${styles.navigationLogo}`} href="/">
            LearnHub.mk
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
        <div className={`${styles.BKG} ${!isSun ? styles.BKGLight : styles.BKGDark}`}>
          <div
            className={`${styles.animate} ${!isSun ? styles.moveRight : ''}`}
            onClick={handleClick}
          >
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
