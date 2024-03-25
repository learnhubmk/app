import BlogList from '../components/module-components/blog-list/BlogList';
import Hero from '../components/module-components/hero/Hero';
import LearnhubAnimation from '../components/module-components/learnhub-animation/LearnhubAnimation';
import styles from './page.module.scss';
import Newsletter from '../components/reusable-components/newsletter/Newsletter';

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
      <LearnhubAnimation />
      <BlogList />
      <Newsletter />
    </main>
  );
};
export default Home;
