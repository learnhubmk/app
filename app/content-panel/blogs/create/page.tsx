'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import styles from './createArticlePage.module.scss';
import PublishArticleForm from '../../../../components/module-components/blog/PublishArticleForm';

const PostArticle = () => {
  return (
    <div className={styles.container}>
      <h2>Објави статија</h2>

      <div className={styles.controlsContainer}>
        <PublishArticleForm />
      </div>
    </div>
  );
};

export default PostArticle;
