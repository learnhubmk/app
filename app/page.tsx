'use client';

import React from 'react';
import Hero from '../components/module-components/hero/Hero';
import InfiniteCarousel from '../components/module-components/infinitie-carousel/InfiniteCarousel';
import PerkCards from '../components/module-components/perk-cards/PerkCards';
import FAQ from '../components/module-components/faq/FAQ';
import FAQ_DUMMY_DATA from '../data/FAQ';
import Contact from '../components/module-components/contact/Contact';
import ProjectsSection from '../components/module-components/ProjectsSection/projectsSection';
import ProjectCardData from '../components/module-components/ProjectsSection/ProjectCardData';
import MissionVision from '../components/module-components/Mission&Vision/MissionVision';

const Home = () => {
  return (
    <>
      <Hero
        title="Стекни релевантно знаење и IT вештини"
        text="Соработувај со луѓе од заедницата и собирај релевантно искуство преку практична работа на долгорочни проекти во реална околина, поддржани од искусни ментори."
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
