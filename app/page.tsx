import FAQ from '../components/module-components/FAQ/FAQ';
import Hero from '../components/module-components/Hero/Hero';
import BlogList from '../components/module-components/blog-list/BlogList';
import LearnhubAnimation from '../components/module-components/learnhub-animation/LearnhubAnimation';
import styles from './page.module.scss';
import Newsletter from '../components/reusable-components/newsletter/Newsletter';
import MemberList from '../components/module-components/member-list/MemberList';

import FAQ_DUMMY_DATA from '../data/FAQ';

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
      <BlogList pageTitle="home" gridLayout="grid__1x3" />
      <Newsletter />
      <MemberList />
      <FAQ data={FAQ_DUMMY_DATA} />
    </main>
  );
};
export default Home;
