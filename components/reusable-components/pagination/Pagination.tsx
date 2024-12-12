/* eslint-disable camelcase */

import React from 'react';
import { MetaData } from '../../../Types';
import styles from './Pagination.module.scss';

interface PaginationProps {
  meta: MetaData;
  setPage: (page: number) => void;
}
const defaultMeta: MetaData = {
  current_page: 1,
  from: 0,
  last_page: 1,
  links: [],
  path: '',
  per_page: 10,
  to: 0,
  total: 0,
};

const Pagination = ({ meta, setPage }: PaginationProps) => {
  const { current_page, last_page } = meta;
  const pages = Array.from({ length: last_page }, (_, i) => i + 1);

  if (meta) {
    return (
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          type="button"
          onClick={() => setPage(current_page - 1)}
          disabled={current_page === 1}
        >
          &lt;
        </button>

        {pages.map((page) => (
          <button
            className={`${current_page === page ? styles.selectedPaginationButton : styles.paginationButton}`}
            type="button"
            key={page}
            onClick={() => setPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.paginationButton}
          type="button"
          onClick={() => setPage(current_page + 1)}
          disabled={current_page === last_page}
        >
          &gt;
        </button>
      </div>
    );
  }

  return null;
};

export default Pagination;
export { defaultMeta };
