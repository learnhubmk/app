'use client';

import { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';

import ExpandCollapseButton from '../../reusable-components/expand-button/ExpandCollapseButton';

import classes from './FAQ.module.scss';

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
  const [clickedTopic, setClickedTopic] = useState<{ [id: number]: boolean }>({});

  const handleClickedTopic = (id: number) => {
    setClickedTopic((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className={classes.faqContainer}>
      <h1 className="display-l">Често поставувани прашања</h1>
      <ul>
        {data.map(({ id, title, content }) => {
          return (
            <li key={id}>
              <div onClick={() => handleClickedTopic(id)} role="presentation">
                <div>
                  <h3 className="title-l">{title}</h3>
                  <ExpandCollapseButton trigger={clickedTopic[id]} />
                </div>
                <AnimatePresence>
                  {clickedTopic[id] && (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <m.div {...topicStyles}>
                      <div>
                        <p className="label-s">{content}</p>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FAQ;
