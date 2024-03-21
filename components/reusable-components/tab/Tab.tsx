'use client';

import { useState } from 'react';

import style from './tab.module.scss';

interface TabProps {
  leftTabText: string;
  rightTabText: string;
}

const Tab = ({ leftTabText, rightTabText }: TabProps) => {
  const [tabValue, setTabValue] = useState(leftTabText);

  return (
    <>
      <div className={style.tab}>
        <button
          type="button"
          className={`${style.tabLinks} title-l`}
          onClick={() => setTabValue(leftTabText)}
        >
          {leftTabText}
        </button>
        <div className={style.dividerVertical} />
        <button
          type="button"
          className={`${style.tabLinks} title-l`}
          onClick={() => setTabValue(rightTabText)}
        >
          {rightTabText}
        </button>
      </div>
      <div>{tabValue}</div>
    </>
  );
};

export default Tab;
