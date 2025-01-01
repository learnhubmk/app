'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaUser, FaSignOutAlt, FaChevronDown, FaChevronUp, FaEnvelope } from 'react-icons/fa';
import { Session } from 'next-auth';
import sunImage from '../../../public/theme/sun.png';
import moonImage from '../../../public/theme/moon.png';
import LogoNavigation from '../../../public/logo/logo-black.svg';
import styles from './navigation.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import { User, UserStatus } from '../_Types';
import useClickOutside from '../../../api/utils/HOC/useClickOutside';
import LogoutButton from '../button/LogoutButton';

function extractUserFromSession(session: Session | null): User {
  if (!session || !session.user) {
    return {
      email: '',
      firstName: 'Guest',
      lastName: '',
      status: UserStatus.Active,
      image: null,
    };
  }

  const email = typeof session.user.email === 'string' ? session.user.email : '';
  const name = typeof session.user.name === 'string' ? session.user.name : '';
  const [firstName, lastName] = name.split(' ');

  return {
    email,
    firstName: firstName || 'Guest',
    lastName: lastName || '',
    status: UserStatus.Active,
    image: typeof session.user.image === 'string' ? session.user.image : null,
  };
}

const Navigation = () => {
  const { data: session } = useSession();
  const user: User = extractUserFromSession(session);
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const isContentPanel = pathname.startsWith('/content-panel');
  const isSun = theme === 'light';

  useClickOutside(menuRef, () => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  const renderAvatarMenu = () => (
    <div className={styles.avatarMenu}>
      <Link href="/content-panel/dashboard" className={styles.menuItem}>
        <FaUser /> {`${user.firstName} ${user.lastName}`}
      </Link>
      <div className={styles.userEmail}>
        <FaEnvelope /> {user.email}
      </div>
      <LogoutButton redirectUrl="/" className={styles.menuItem} icon={<FaSignOutAlt />} />
    </div>
  );

  const handleKeyDown = (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  };

  const getImageSrc = (image: string | File | null): string => {
    if (typeof image === 'string') return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return '/user.png';
  };

  const contentPanelRoutes = [
    { path: '/content-panel/blogs', name: 'Blogs' },
    { path: '/content-panel/tags', name: 'Tags' },
  ];

  return (
    <nav className={`${styles.navigation} ${isSun ? styles.lightNavigation : ''}`}>
      <div className={styles.navigationContainer}>
        <Link className={styles.navigationLogoLink} href="/">
          <Image src={LogoNavigation} className={styles.navigationLogo} alt="LearnHub Logo" />
        </Link>
        {isContentPanel && session?.user && (
          <>
            <div className={styles.navLinks}>
              {contentPanelRoutes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={pathname === route.path ? styles.active : ''}
                >
                  {route.name}
                </Link>
              ))}
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
                    src={getImageSrc(user.image)}
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
