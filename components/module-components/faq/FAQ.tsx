'use client';

import { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import ExpandCollapseButton from '../../reusable-components/expand-button/ExpandCollapseButton';
import style from './FAQ.module.scss';
import { useTheme } from '../../../app/context/themeContext';

interface Topic {
  id: number;
  title: string;
  content: string;
}

interface FAQProps {
  data: Topic[];
}

const topicStyles = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
      },
    },
  },
};

const FAQ = ({ data }: FAQProps) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';
  const themeClass = lightTheme ? style.faqLight : style.faqDark;
  const listItemClass = lightTheme ? style.faqLiLight : style.faqLiDark;
  const textClass = lightTheme ? style.faqTextDark : style.faqTextLight;
  const [clickedTopic, setClickedTopic] = useState<{ [id: number]: boolean }>({});

  const handleClickedTopic = (id: number) => {
    setClickedTopic((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className={`${style.faqSection} ${themeClass}`}>
      <div className={style.faqContainer}>
        <div>
          <h1 className={`${style.faqTitle} ${textClass}`}>Често поставувани прашања</h1>
          <p className={`${style.faqDesc} ${textClass}`}>
            Се обидовме да ги одговориме најчесто поставуваните прашања. Доколку имаш дополнителни
            прашања слободно контактирај нè.
          </p>
        </div>
        <ul>
          {data.map(({ id, title, content }) => {
            return (
              <li
                className={`${style.faqLiElement} ${listItemClass}`}
                key={id}
                onClick={() => handleClickedTopic(id)}
                role="presentation"
              >
                <div>
                  <div>
                    <h3 className={`${style.faqStext} ${textClass}`}>{title}</h3>
                    <ExpandCollapseButton trigger={clickedTopic[id]} />
                  </div>
                  <AnimatePresence>
                    {clickedTopic[id] && (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <m.div {...topicStyles}>
                        <div>
                          <p className={`${style.faqContent} ${textClass}`}>{content}</p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
