import styles from "./page.module.scss";

import ButtonComponent from "../components/reusable-components/Button/ButtonComponent";
import OutlinedCard from "../components/reusable-components/Card/CardComponent";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home LearnHub.mk</h1>
      <OutlinedCard />
      <ButtonComponent btnText="Click here!" textColor="white" />
    </main>
  );
}
