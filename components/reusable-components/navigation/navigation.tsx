import React from 'react';
import Link from 'next/link';
import styles from './navigation.module.scss';

function Navigation() {
  return (
    <nav className={styles.largeNavbar}>
      <div className={styles.navContainer}>
        <div className={styles.leftContent}>
          <Link className={styles.navbarBrand} href="/">
            LearnHub.mk
          </Link>
          <div id="navbarNav">
            <ul className={styles.horizontalNav}>
              <Link className={styles.navLink1} href="/">
                Визија{' '}
              </Link>
              <Link className={styles.navLink1} href="/">
                {' '}
                Цели{' '}
              </Link>
              <Link className={styles.navLink1} href="/">
                {' '}
                Контакт{' '}
              </Link>
              <Link className={styles.navLink1} href="/">
                Блог{' '}
              </Link>
            </ul>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div>
            <Link href="/signup" passHref>
              <button type="button" className={styles.customButton1}>
                Sign Up
              </button>
            </Link>
          </div>
          <div>
            <Link href="/signin" passHref>
              <button type="button" className={styles.customButton}>
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;