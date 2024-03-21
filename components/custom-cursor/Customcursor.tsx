'use client';

// CustomCursor.tsx

// CustomCursor.tsx

import React, { useEffect, useState } from 'react';
import styles from './customcursor.module.scss'; // Import CSS module

interface CustomCursorProps {
  isLarge?: boolean; // Prop to determine if cursor should be large
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
