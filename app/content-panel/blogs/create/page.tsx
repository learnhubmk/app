/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from 'next/link';
import styles from './createArticlePage.module.scss';
import PublishArticleForm from '../../../../components/module-components/blog/PublishArticleForm';

const PostArticle = () => {
  return (
    <div>
      <Link href="/content-panel/blogs" className={styles.backButton}>
        &#8592; Назад
      </Link>
      <div className={styles.container}>
        <h2>Објави статија</h2>

        <div className={styles.controlsContainer}>
          <PublishArticleForm />
        </div>
      </div>
    </div>
  );
};

export default PostArticle;
