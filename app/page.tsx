'use client';

// import BlogList from '../components/module-components/blog-list/BlogList';
import Contact from '../components/module-components/contact/Contact';
import Hero from '../components/module-components/hero/Hero';
import LearnhubAnimation from '../components/module-components/learnhub-animation/LearnhubAnimation';
import Newsletter from '../components/reusable-components/newsletter/Newsletter';
import MemberList from '../components/module-components/member-list/MemberList';
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
      <LearnhubAnimation />
      {/* <BlogList pageTitle="home" gridLayout="grid__1x3" /> */}
      <Newsletter />
      <MemberList />

      <Contact />
    </main>
  );
};
export default Home;
