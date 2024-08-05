import BlogList from '../../components/module-components/blog-list/BlogList';
import Tab from '../../components/reusable-components/tab/Tab';
// import AddNewPost from '../../components/module-components/blog/addNewPost';

const Blog = () => {
  return (
    <div>
      {/* <AddNewPost /> */}
      <Tab leftTabText="За тебе" rightTabText="Најново" />
      <BlogList pageTitle="blog" gridLayout="grid__1x3" blogCardsNumber={6} />
    </div>
  );
};

export default Blog;
