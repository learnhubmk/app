import React from 'react';
import styles from './TitleContentLayout.module.scss';

const TitleContentLayout = ({ title, children }: { children: React.ReactNode; title: string }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>

      <div className={styles.controlsContainer}>{children}</div>
    </div>
  );
};

export default TitleContentLayout;
