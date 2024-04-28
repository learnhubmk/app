'use client';

import React from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import style from './missionVision.module.scss';
import { useTheme } from '../../../app/context/themeContext';

const MissionVision = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const numCirclesPerRow = 94;
  const numRows = 142;

  return (
    <div className={style.mainMissionPage}>
      <div
        className={`${style.MissionVisionMain} ${isLightTheme ? style.missionMainWhite : style.missionMainDark}`}
      >
        <Image
          className={style.missionVisionImg}
          src="/mission_vision.png"
          alt="Our mission & vision"
          width={1239}
          height={888}
        />

        <div
          className={`${style.missionTitle} ${isLightTheme ? style.missionTitleWhite : style.missionTitleDark}`}
        >
          <h2>Мисија</h2>
          <p>
            Мисијата на LearnHub е негување на одржлива и инклузивна заедница од сите припадници на
            IТ-секторот во Македонија, од почетници-ентузијасти до експерти со децениско искуство во
            струката со цел заедничко спојување на вештините и искуствата во насока на тимска
            соработка на реални проекти и безрезервна поддршка и едукација во текот на целиот процес
            од идеја до пазар и одржување.
          </p>

          <h2>Визија</h2>
          <p>
            Визијата на LearnHub е да биде препознатива заедница по соработката, едукацијата и
            поддршката за сите луѓе кои дејствуваат во IT секторот и пошироко. Заедница од каде што
            многу нови производи и услуги ќе бидат резултат на заеднички напори и спој на различни
            вештини од повеќе области во технолошкиот свет.
          </p>
        </div>

        <div className={style.circlePattern}>
          {Array.from({ length: numRows }, () => uuidv4()).map((rowId) => (
            <div key={rowId} className={style.circleRow}>
              {Array.from({ length: numCirclesPerRow }, () => uuidv4()).map((circleId) => (
                <div key={circleId} className={style.circle} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
