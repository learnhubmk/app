import React from 'react';
import Image from 'next/image';
import style from './signUpPage.module.scss';
import ReusableForm from '../../reusable-components/reusable-form/ReusableForm';
import patternSignUp from '../../../public/SignUp/patternSignUp.svg';

const SignUpPage = () => {
  return (
    <section className={style.signUpSection}>
      <div className={style.signUp}>
        <div className={style.signUpLeftContainer}>
          <div className={style.titleWrapper}>
            <h1>Добредојдовте на платформата!</h1>
            <p>Ве молиме пополнете ги податоците подолу за да креирате свој профил.</p>
          </div>
          <div className={style.graphicContainer}>
            <div className={style.dashboardPreview} />
          </div>
        </div>
        <div className={style.signUpRightContainer}>
          <ReusableForm />
        </div>
      </div>
      <Image src={patternSignUp} className={`${style.pattern}`} alt="pattern picture" />
    </section>
  );
};

export default SignUpPage;
