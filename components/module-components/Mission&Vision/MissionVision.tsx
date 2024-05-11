'use client';

import React from 'react';
import Image from 'next/image';
import style from './missionVision.module.scss';
import { useTheme } from '../../../app/context/themeContext';

const MissionVision = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <div
      className={`${style.MissionVisionMain} ${isLightTheme ? style.missionMainWhite : style.missionMainDark}`}
    >
      <Image
        className={style.imgMission}
        src="\m&vPhoto.svg"
        alt="Our mission & vision"
        width={1239}
        height={1031}
      />

      <Image
        className={style.missionPattern}
        src="/pattern.svg"
        alt="pattern"
        width={457}
        height={895}
      />

      <div
        className={`${style.missionTitle} ${isLightTheme ? style.missionTitleWhite : style.missionTitleDark}`}
      >
        <div className={style.cardMission}>
          <Image
            className={style.mobilePattern}
            src="./frame6.svg"
            alt="Mobile Pattern"
            width={109}
            height={109}
          />
          <div>
            <h2>Мисија</h2>
            <p>
              Мисијата на LearnHub е негување на одржлива и инклузивна заедница од сите припадници
              на IТ-секторот во Македонија, од почетници-ентузијасти до експерти со децениско
              искуство во струката со цел заедничко спојување на вештините и искуствата во насока на
              тимска соработка на реални проекти и безрезервна поддршка и едукација во текот на
              целиот процес од идеја до пазар и одржување.
            </p>
          </div>
        </div>

        <div className={style.cardMission}>
          <Image
            className={style.mobilePattern}
            src="./frame6.svg"
            alt="Mobile Pattern"
            width={109}
            height={109}
          />
          <div>
            <h2>Визија</h2>
            <p>
              Визијата на LearnHub е да биде препознатива заедница по соработката, едукацијата и
              поддршката за сите луѓе кои дејствуваат во IT секторот и пошироко. Заедница од каде
              што многу нови производи и услуги ќе бидат резултат на заеднички напори и спој на
              различни вештини од повеќе области во технолошкиот свет.
            </p>
          </div>
        </div>
        <Image
          className={style.patternHorizontally}
          src="/frame5.svg"
          alt="Mobile Pattern"
          width={67}
          height={104}
        />
      </div>
    </div>
  );
};

export default MissionVision;