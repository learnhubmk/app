'use client';

import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import style from './scrollToTop.module.scss';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    if (isVisible) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      type="button"
      aria-label="Scroll To Top"
      className={`${style.scrollToTopBtn} ${isVisible ? style.show : style.hide}`}
      onClick={scrollToTop}
    >
      <i className={`bi bi-arrow-up ${style.arrowIcon}`} />
    </button>
  );
};

export default ScrollToTopButton;
