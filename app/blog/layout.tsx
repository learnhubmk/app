import { IoIosSearch } from 'react-icons/io';
import Input from '../../components/reusable-components/Input/input';
import style from './layout.module.scss';

const LayoutBlogPage = ({
  children,
}: Readonly<{
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}>) => {
  return (
    <div className={style.mainContainer}>
      <div>{children}</div>
      <div className={style.layoutContainer}>
        <Input type="text" placeholder="Пребарај" icon={<IoIosSearch />} />
        <div className={style.suggestArticleContainer}>
          <h2 className="title-l">Предлог Блог Статии</h2>
        </div>
        <div className={style.filterContainer}>
          <h2 className="title-l">Филтрирај По Таг</h2>
        </div>
      </div>
    </div>
  );
};

export default LayoutBlogPage;
