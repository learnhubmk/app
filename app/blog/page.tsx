import BlogList from '../../components/module-components/blog-list/BlogList';
import Tab from '../../components/reusable-components/tab/Tab';

import style from './page.module.scss';

const Blog = () => {
  return (
    <div className={style.blogContainer}>
      <Tab leftTabText="За тебе" rightTabText="Најново" />
      <BlogList pageTitle="blog" gridLayout="grid__1x2" blogCardsNumber={8} />
    </div>
  );
};

export default Blog;
