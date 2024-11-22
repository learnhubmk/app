import React from 'react';
// import BlogListView from '../../../components/module-components/create-blogs/BlogListView';
import HomePagination from '../../../components/reusable-components/pagination/HomePagination';
import BlogListView from '../../../components/module-components/create-blogs/BlogListView';

const page = () => {
  return (
    <div>
      <BlogListView />
      <HomePagination />
    </div>
  );
};

export default page;
