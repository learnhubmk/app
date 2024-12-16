import React from 'react';
import BlogListView from '../../../components/module-components/create-blogs/BlogListView';
import PostArticle from './create/page';

const page = () => {
  return (
    <div>
      <BlogListView />
      <PostArticle />
    </div>
  );
};

export default page;
