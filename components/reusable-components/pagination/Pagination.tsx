/* eslint-disable camelcase */

// This component expects to receive meta object that contains the links
// as well as pagination data. See types for more details on what's expected.

import React from 'react';
import styles from './Pagination.module.scss';
import { MetaData } from '../../../apis/queries/tags/getTags';

interface PaginationProps {
  meta: MetaData;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ meta, setPage }) => {
  const { current_page, last_page } = meta;
  const pages = Array.from({ length: last_page }, (_, i) => i + 1); // create array with page numbers [1, 2...]

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
