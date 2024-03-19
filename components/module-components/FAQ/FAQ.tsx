'use client';
import { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';

import ExpandCollapseButton from '../../reusable-components/ExpandCollapseButton';

import classes from './FAQ.module.scss';

interface FAQProps {
  data: Topic[];
}

interface Topic {
  id: number;
  title: string;
  content: string;
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
    <section className={classes.container}>
      <h1 className="display-l">Често поставувани прашања</h1>
      <ul>
        {data.map(({ id, title, content }) => {
          return (
            <li
              key={id}
              onClick={() => {
                handleClickedTopic(id);
              }}
            >
              <div>
                <h3 className="title-l">{title}</h3>
                <ExpandCollapseButton trigger={clickedTopic[id]} />
              </div>
              <AnimatePresence>
                {clickedTopic[id] && (
                  <m.div {...topicStyles}>
                    <div>
                      <p className="label-s">{content}</p>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FAQ;
