import React from 'react';
import Link from 'next/link';
import Styles from './navigation.module.scss';

function Navigation() {
  return (
    <nav className={Styles.LargeNavbar}>
      <div className={Styles.NavContainer}>
        <div className={Styles.LeftContent}>
          <Link className={Styles.NavbarBrand} href="/">
            LearnHub.mk
          </Link>
          <div id="navbarNav">
            <ul className={Styles.HorizontalNav}>
              <Link className={Styles.NavLink1} href="/">
                Визија{' '}
              </Link>
              <Link className={Styles.NavLink1} href="/">
                {' '}
                Цели{' '}
              </Link>
              <Link className={Styles.NavLink1} href="/">
                {' '}
                Контакт{' '}
              </Link>
              <Link className={Styles.NavLink1} href="/">
                Блог{' '}
              </Link>
            </ul>
          </div>
        </div>
        <div className={Styles.RightContent}>
          <div>
            <Link href="/signup" passHref>
              <button type="button" className={Styles.CustomButton1}>
                Sign Up
              </button>
            </Link>
          </div>
          <div>
            <Link href="/signin" passHref>
              <button type="button" className={Styles.CustomButton}>
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
