'use client';

import BlogList from '../../components/module-components/blog-list/BlogList';
import Tab from '../../components/reusable-components/tab/Tab';
import { useTagFilterContext } from '../context/tagFilterContext';

const Blog = () => {
  const { selectedTags } = useTagFilterContext();
  console.log(selectedTags);
  return (
    <div>
      <Tab leftTabText="За тебе" rightTabText="Најново" />
      <BlogList pageTitle="blog" gridLayout="grid__1x3" blogCardsNumber={6} />
    </div>
  );
};

export default Blog;
