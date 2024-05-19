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

  const [clickedTopic, setClickedTopic] = useState<{ [id: number]: boolean }>({});

  const handleClickedTopic = (id: number) => {
    setClickedTopic((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className={`${style.faqSection} ${lightTheme ? style.faqLight : style.faqDark}`}>
      <div className={style.faqContainer}>
        <div>
          <h1
            className={`${style.faqTitle} ${lightTheme ? style.faqDarkTitle : style.faqLightTitle}`}
          >
            Често поставувани прашања
          </h1>
          <p className={`${style.faqDesc} ${lightTheme ? style.faqDarkDesc : style.faqLightDesc}`}>
            We tried to answer the most common questions, if you have any additional, please get in
            touch with our friendly team
          </p>
        </div>
        <ul>
          {data.map(({ id, title, content }) => {
            return (
              <li
                className={`${style.faqLiElement} ${lightTheme ? style.faqLiLight : style.faqLiDark}`}
                key={id}
              >
                <div onClick={() => handleClickedTopic(id)} role="presentation">
                  <div>
                    <h3
                      className={`${style.faqStext} ${lightTheme ? style.faqTextDark : style.faqTextLight}`}
                    >
                      {title}
                    </h3>
                    <ExpandCollapseButton trigger={clickedTopic[id]} />
                  </div>
                  <AnimatePresence>
                    {clickedTopic[id] && (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <m.div {...topicStyles}>
                        <div>
                          <p
                            className={`${style.faqContent} ${lightTheme ? style.faqTextDark : style.faqTextLight}`}
                          >
                            {content}
                          </p>
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
