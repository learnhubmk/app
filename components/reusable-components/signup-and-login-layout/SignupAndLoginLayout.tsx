'use client';

import React from 'react';
import Image from 'next/image';
import styles from './SignupAndLoginLayout.module.scss';
import { useTheme } from '../../../app/context/themeContext';

interface SignupAndLoginProps {
  welcomeTitle: string;
  welcomeSubtitle: string;
  // form?: JSX.Element;
}
const SignupAndLoginLayout = ({ welcomeTitle, welcomeSubtitle }: SignupAndLoginProps) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <div
      className={`${styles.loginPage} ${isLightTheme ? styles.lightLoginPage : styles.darkLoginPage}`}
    >
      <div className={styles.container}>
        <div className={styles.welcomeContainer}>
          <h1
            className={`${styles.welcomeBackTitle}  ${isLightTheme ? styles.welcomeBackTitleLight : styles.welcomeBackTitleDark}`}
          >
            {welcomeTitle}{' '}
          </h1>
          <p
            className={`${styles.loginSubtitleInfo}  ${isLightTheme ? styles.loginSubtitleInfoLight : styles.loginSubtitleInfoDark}`}
          >
            {welcomeSubtitle}{' '}
          </p>

          <div className={styles.imageContainer}>
            <div className={styles.pattern}>
              <Image src="/pattern.svg" alt="pattern" fill sizes="70vw" />{' '}
            </div>
            <div className={styles.dashboard}>
              <Image
                className={styles.dashboard}
                src="/dashboard.svg"
                alt="dashboard"
                width={630}
                height={513}
              />
            </div>
          </div>
        </div>
        {/* {form} */}
      </div>
    </div>
  );
};

export default SignupAndLoginLayout;
