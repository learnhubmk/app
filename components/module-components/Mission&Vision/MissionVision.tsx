'use client';

import React from 'react';
import Image from 'next/image';
import style from './missionVision.module.scss';
import { useTheme } from '../../../app/context/themeContext';

const MissionVision = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <section
      className={`${style.missionVisionMain} ${isLightTheme ? style.missionMainWhite : style.missionMainDark}`}
    >
      <div className={`${style.mvImgContainer} ${style.mvLeftSide}`}>
        <Image
          className={style.imgMission}
          src="\Mission&Vision\m&vPhoto.svg"
          alt="Our mission & vision"
          width={0}
          height={0}
          sizes="100vw"
          fill
        />
      </div>

      <div className={`${style.mvImgContainer} ${style.mvRightSide}`}>
        <Image
          className={style.missionPattern}
          src="\Mission&Vision\pattern.svg"
          alt="pattern"
          width={0}
          height={0}
          sizes="70vw"
          fill
        />
      </div>

      <div
        className={`${style.missionTitle} ${isLightTheme ? style.missionTitleWhite : style.missionTitleDark}`}
      >
        <Image
          className={style.mobilePattern}
          src="\Mission&Vision\frame6.svg"
          alt="Mobile Pattern"
          width={109}
          height={109}
        />
        <h2>Мисија</h2>
        <p>
          Мисијата на LearnHub е негување на одржлива и инклузивна заедница од сите припадници на
          IТ-секторот во Македонија, од почетници-ентузијасти до експерти со децениско искуство во
          струката со цел заедничко спојување на вештините и искуствата во насока на тимска
          соработка на реални проекти и безрезервна поддршка и едукација во текот на целиот процес
          од идеја до пазар и одржување.
        </p>

        <Image
          className={style.mobilePattern}
          src="\Mission&Vision\frame6.svg"
          alt="Mobile Pattern"
          width={109}
          height={109}
        />
        <h2>Визија</h2>
        <p>
          Визијата на LearnHub е да биде препознатива заедница по соработката, едукацијата и
          поддршката за сите луѓе кои дејствуваат во IT секторот и пошироко. Заедница од каде што
          многу нови производи и услуги ќе бидат резултат на заеднички напори и спој на различни
          вештини од повеќе области во технолошкиот свет.
        </p>
      </div>
      <Image
        className={style.patternHorizontally}
        src="\Mission&Vision\frame5.svg"
        alt="Mobile Pattern"
        width={67}
        height={104}
      />
    </section>
  );
};

export default MissionVision;
