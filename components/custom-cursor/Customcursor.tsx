'use client';

import React, { useEffect, useState } from 'react';
import styles from './customcursor.module.scss';

interface CustomCursorProps {
  isLarge?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isLarge }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      className={`${styles.customCursor} ${isLarge ? styles.large : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default CustomCursor;
