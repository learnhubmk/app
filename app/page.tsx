'use client';

import React from 'react';
import Hero from '../components/module-components/hero/Hero';
import InfiniteCarousel from '../components/module-components/infinitie-carousel/InfiniteCarousel';
import PerkCards from '../components/module-components/Perk-Cards/PerkCards';
import FAQ from '../components/module-components/FAQ/FAQ';
import FAQ_DUMMY_DATA from '../data/FAQ';
import Contact from '../components/module-components/Contact/Contact';
import CaptchaWidget from '../components/reusable-components/turnstile-captcha/CaptchaWidget';
import { useCaptchaToken } from './context/CaptchaTokenContext';

const Home = () => {
  const { captchaToken } = useCaptchaToken();
  return (
    <>
      <Hero
        title="Развијте го вашиот потенцијал"
        text="Овозможете си да достигнете нови височини, развивајќи и споделувајќи вештини cо заедница од ентузијасти и професионалци. Со LearnHub, вие не сте само дел  
        од заедница; вие градите иднина."
      />
      <InfiniteCarousel />
      <PerkCards />
      {/* <MemberList /> */}
      <FAQ data={FAQ_DUMMY_DATA} />
      <Contact />
      {captchaToken === null && <CaptchaWidget />}
    </>
  );
};
export default Home;
