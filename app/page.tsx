import BlogList from '../components/module-components/blog-list/BlogList';
import Hero from '../components/module-components/hero/Hero';
import styles from './page.module.scss';
import Logo3D from '../components/module-components/logo3D/Logo3D';

const Home = () => {
  return (
    <main className={styles.main}>
      <Logo3D />
      <Hero
        title="Од Заедницата, За Заедницата"
        headline="Развијте Го Вашиот Потенцијал Со LearnHub"
        text="Овозможете си да достигнете до нови височини, развивајќи и споделувајќи вештини cо
          заедница од ентузијасти и професионалци. Со LearnHub, вие не сте само дел од заедница; вие
          градите иднина."
      />
      <BlogList />
    </main>
  );
};
export default Home;
