'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { useSession } from 'next-auth/react';
import styles from './createArticlePage.module.scss';
import PublishArticleForm from '../../../../components/module-components/blog/PublishArticleForm';
import { UserRole } from '../../../../Types';

const PostArticle = () => {
  const { data: session } = useSession();

  // console.log('Session data:', session);
  const userRole = session?.user.role as UserRole;

  return (
    <div className={styles.container}>
      <h2>Објави статија</h2>

      <div className={styles.controlsContainer}>
        <PublishArticleForm userRole={userRole} />
      </div>
    </div>
  );
};

export default PostArticle;
