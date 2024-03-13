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
              <li className={styles.navLink1}>
                <Link href="/">Визија </Link>
              </li>
              <li className={styles.navLink1}>
                <Link href="/"> Цели </Link>
              </li>
              <li className={styles.navLink1}>
                <Link href="/"> Контакт </Link>
              </li>
              <li className={styles.navLink1}>
                <Link href="/">Блог </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rightContent}>
          <button className={styles.customButton1} type="submit">
            Sign In
          </button>
          <button className={styles.customButton} type="submit">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
