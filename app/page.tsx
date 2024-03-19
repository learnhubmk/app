import FAQ from '../components/module-components/FAQ/FAQ';
import Hero from '../components/module-components/Hero/Hero';
import styles from './page.module.scss';

import {FAQ_DUMMY_DATA} from "../data/FAQ"

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero
        title="Од Заедницата, За Заедницата"
        headline="Развијте Го Вашиот Потенцијал Со LearnHub"
        text="Овозможете си да достигнете до нови височини, развивајќи и споделувајќи вештини cо
          заедница од ентузијасти и професионалци. Со LearnHub, вие не сте само дел од заедница; вие
          градите иднина."
      />
      <h1 className="display-l">Home LearnHub.mk</h1>
      <FAQ data={FAQ_DUMMY_DATA} />
    </main>
  );
}
