'use client';

import React from 'react';
import Hero from '../components/module-components/hero/Hero';
import InfiniteCarousel from '../components/module-components/infinitie-carousel/InfiniteCarousel';
import PerkCards from '../components/module-components/perk-cards/PerkCards';
import FAQ from '../components/module-components/faq/FAQ';
import FAQ_DUMMY_DATA from '../data/FAQ';
import Contact from '../components/module-components/contact/Contact';
import ProjectsSection from '../components/module-components/projectsSection/projectsSection';
import ProjectCardData from '../components/module-components/projectsSection/ProjectCardData';
import MissionVision from '../components/module-components/Mission&Vision/MissionVision';

const Home = () => {
  return (
    <>
      <Hero
        title="Развијте го вашиот потенцијал"
        text="Овозможете си да достигнете нови височини, развивајќи и споделувајќи вештини cо заедница од ентузијасти и професионалци. Со LearnHub, вие не сте само дел  
        од заедница; вие градите иднина."
      />
      <InfiniteCarousel />
      <PerkCards />
      <MissionVision />
      {/* <MemberList /> */}
      <ProjectsSection cards={ProjectCardData} />
      <FAQ data={FAQ_DUMMY_DATA} />
      <Contact />
    </>
  );
};
export default Home;
