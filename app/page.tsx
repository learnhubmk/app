import React from 'react';
import FAQ from '../components/module-components/FAQ/FAQ';
import Hero from '../components/module-components/hero/Hero';
import BlogList from '../components/module-components/blog-list/BlogList';
import LearnhubAnimation from '../components/module-components/learnhub-animation/LearnhubAnimation';
import Newsletter from '../components/reusable-components/newsletter/Newsletter';
import MemberList from '../components/module-components/member-list/MemberList';

import FAQ_DUMMY_DATA from '../data/FAQ';
import Contact from '../components/module-components/Contact/Contact';

const Home = () => {
  return (
    <>
      <Hero
        title="Развијте го вашиот потенцијал"
        text="Овозможете си да достигнете нови височини, развивајќи и споделувајќи вештини cо заедница од ентузијасти и професионалци. Со LearnHub, вие не сте само дел  
        од заедница; вие градите иднина."
      />
      <LearnhubAnimation />
      <BlogList pageTitle="home" gridLayout="grid__1x3" blogCardsNumber={6} />
      <Newsletter />
      <MemberList />
      <FAQ data={FAQ_DUMMY_DATA} />
      <Contact />
    </>
  );
};
export default Home;
