import BlogList from '../../components/module-components/blog-list/BlogList';
import Tab from '../../components/reusable-components/tab/Tab';

const Blog = () => {
  return (
    <>
      <Tab leftTabText="За тебе" rightTabText="Најново" />
      <BlogList pageTitle="blog" gridLayout="grid__1x2" />
    </>
  );
};

export default Blog;
