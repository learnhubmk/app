/* eslint-disable camelcase */

// This component expects to receive meta object that contains the links
// as well as pagination data. See types for more details.

import React from 'react';
import { MetaData } from '../../../apis/queries/tags/getTags';

interface PaginationProps {
  meta: MetaData;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ meta, setPage }) => {
  const { links, current_page, last_page } = meta;
  const pages = Array.from({ length: last_page }, (_, i) => i + 1); // create array with page numbers [1, 2...]

  if (links?.length > 0) {
    return (
      <div className="pagination">
        <button
          type="button"
          onClick={() => setPage(current_page - 1)}
          disabled={current_page === 1}
        >
          &lt;
        </button>

        {pages.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => setPage(page)}
            disabled={current_page === page}
          >
            {page}
          </button>
        ))}

        <button
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
