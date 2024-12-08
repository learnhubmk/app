/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaUser, FaSignOutAlt, FaChevronDown, FaChevronUp, FaEnvelope } from 'react-icons/fa';
import sunImage from '../../../public/theme/sun.png';
import moonImage from '../../../public/theme/moon.png';
import LogoNavigation from '../../../public/logo/logo-black.svg';
import styles from './navigation.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import { User } from '../_Types';

const user: User = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/user.png',
};

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const isContentPanel = pathname.startsWith('/content-panel');
  const isSun = theme === 'light';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderAvatarMenu = () => (
    <div className={styles.avatarMenu}>
      <Link href="/content-panel/dashboard" className={styles.menuItem}>
        <FaUser /> {user.name}
      </Link>
      <div className={styles.userEmail}>
        <FaEnvelope /> {user.email}
      </div>
      <button
        type="button"
        className={styles.menuItem}
        onClick={() => {
          /* Implement sign out logic */
        }}
      >
        <FaSignOutAlt /> Sign Out
      </button>
    </div>
  );

  const handleKeyDown = (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  };

  return (
    <nav className={`${styles.navigation} ${isSun ? styles.lightNavigation : ''}`}>
      <div className={styles.navigationContainer}>
        <Link className={styles.navigationLogoLink} href="/">
          <Image src={LogoNavigation} className={styles.navigationLogo} alt="LearnHub Logo" />
        </Link>
        {isContentPanel && (
          <>
            <div className={styles.navLinks}>
              <Link
                href="/content-panel/blogs"
                className={pathname === '/content-panel/blogs' ? styles.active : ''}
              >
                Blogs
              </Link>
              <Link
                href="/content-panel/tags"
                className={pathname === '/content-panel/tags' ? styles.active : ''}
              >
                Tags
              </Link>
            </div>
            <div className={styles.rightSection}>
              <div className={styles.avatarWrapper} ref={menuRef}>
                <div
                  className={styles.avatarContainer}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  onKeyDown={handleKeyDown(() => setIsMenuOpen(!isMenuOpen))}
                  role="button"
                  tabIndex={0}
                >
                  <Image
                    src={user.avatar || '/user.png'}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                  {isMenuOpen ? (
                    <FaChevronUp className={styles.chevronIcon} />
                  ) : (
                    <FaChevronDown className={styles.chevronIcon} />
                  )}
                </div>
                {isMenuOpen && renderAvatarMenu()}
              </div>
            </div>
          </>
        )}
        <div
          className={styles.toggleContainer}
          onClick={toggleTheme}
          onKeyDown={handleKeyDown(toggleTheme)}
          role="button"
          tabIndex={0}
        >
          <div className={`${styles.animate} ${!isSun ? styles.moveRight : ''}`}>
            <div className={`${styles.toggleButton} ${isSun && styles.marginLeftButton}`} />
          </div>
          <Image
            src={isSun ? moonImage : sunImage}
            alt={`${isSun ? 'moon' : 'sun'} icon`}
            width={18}
            height={18}
            className={isSun ? styles.moonImage : styles.sunImage}
          />
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
