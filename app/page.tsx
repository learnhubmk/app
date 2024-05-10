import Hero from '../components/module-components/hero/Hero';
import InfiniteCarousel from '../components/module-components/infinitie-carousel/InfiniteCarousel';
import PerkCards from '../components/module-components/Perk-Cards/PerkCards';
import BlogList from '../components/module-components/blog-list/BlogList';
import Newsletter from '../components/reusable-components/newsletter/Newsletter';
import MemberList from '../components/module-components/member-list/MemberList';
import FAQ from '../components/module-components/FAQ/FAQ';
import Contact from '../components/module-components/Contact/Contact';

import PerkCardsData from '../components/module-components/Perk-Cards/PerkCardsData';
import FAQ_DUMMY_DATA from '../data/FAQ';

import styles from './page.module.scss';

const Home = () => {
  return (
    <>
      <Hero
        title="Развијте го вашиот потенцијал"
        text="Овозможете си да достигнете нови височини, развивајќи и споделувајќи вештини cо заедница од ентузијасти и професионалци. Со LearnHub, вие не сте само дел  
        од заедница; вие градите иднина."
      />
      <InfiniteCarousel />
      <PerkCards data={PerkCardsData} />
      <Newsletter />
      {/* <MemberList /> */}
      <FAQ data={FAQ_DUMMY_DATA} />
      <Contact />
    </>
  );
};
export default Home;
