import BlogList from '../components/module-components/BlogList/BlogList';
import Hero from '../components/module-components/Hero/Hero';
import styles from './page.module.scss';

const Home = () => {
  return (
    <main className={styles.main}>
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
