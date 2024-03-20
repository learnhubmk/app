'use client';

import { useState } from 'react';

import style from './tab.module.scss';

interface TabProps {
  tabOneText: string;
  tabTwoText: string;
}

const Tab = ({ tabOneText, tabTwoText }: TabProps) => {
  const [tabValue, setTabValue] = useState(tabOneText);

  return (
    <>
      <div className={style.tab}>
        <button
          type="button"
          className={`${style.tabLinks} title-l`}
          onClick={() => setTabValue(tabOneText)}
        >
          {tabOneText}
        </button>
        <div className={style.dividerVertical} />
        <button
          type="button"
          className={`${style.tabLinks} title-l`}
          onClick={() => setTabValue(tabTwoText)}
        >
          {tabTwoText}
        </button>
      </div>
      <div>{tabValue}</div>
    </>
  );
};

export default Tab;
