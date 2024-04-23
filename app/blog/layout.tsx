import Input from '../../components/reusable-components/input/Input';
import ScrollToTopButton from '../../components/reusable-components/scroll-to-top/ScrollToTop';
import style from './layout.module.scss';
import TagFilter from '../../components/reusable-components/tag-filter/TagFilter';

const getPosts = async () => {
  const res = await fetch('http://localhost:3000/api/posts');
  return res.json();
};

const LayoutBlogPage = async ({
  children,
}: Readonly<{
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}>) => {
  const data = await getPosts();
  return (
    <>
      <div className={style.mainContainer}>
        <div>{children}</div>
        <div className={style.layoutContainer}>
          <Input type="text" placeholder="Пребарај" icon={<i className="bi bi-search" />} />
          <div className={style.suggestArticleContainer}>
            <h2 className="title-l">Предлог Блог Статии</h2>
          </div>
          <div className={style.filterContainer}>
            <h2 className="title-l">Филтрирај По Таг</h2>
            <TagFilter data={data} />
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default LayoutBlogPage;
