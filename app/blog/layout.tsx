import { IoIosSearch } from 'react-icons/io';
import Input from '../../components/reusable-components/input/Input';
import style from './layout.module.scss';
import CustomCursor from '../../components/custom-cursor/CustomCursor';
import { CursorProvider } from '../../components/context/CursorContext';

const LayoutBlogPage = ({
  children,
}: Readonly<{
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}>) => {
  return (
    <CursorProvider>
      <div className={style.mainContainer}>
        <CustomCursor />
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
    </CursorProvider>
  );
};

export default LayoutBlogPage;
