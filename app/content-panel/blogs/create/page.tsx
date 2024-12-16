'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { useSession } from 'next-auth/react';
import styles from './createArticlePage.module.scss';
import PublishArticleForm from '../../../../components/module-components/blog/PublishArticleForm';

type UserRole = 'content-manager' | 'admin';

const PostArticle = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading....</div>;
  }

  if (!session || !session.user.role) {
    return <div>Access denied</div>;
  }

  const userRole = session.user.role as UserRole;

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
