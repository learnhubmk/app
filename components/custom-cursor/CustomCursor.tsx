'use client';

import React from 'react';
import { useCursor } from '../context/CursorContext';
import styles from './customcursor.module.scss';

interface CustomCursorProps {
  isLarge?: boolean;
  cursorText?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isLarge, cursorText }) => {
  const { position, hideCursor } = useCursor();
  const largeCursorOffset = isLarge ? { x: -20, y: -20 } : { x: 0, y: 0 };

  return (
    !hideCursor && (
      <div
        className={`${styles.customCursor} ${isLarge ? styles.large : ''}`}
        style={{
          left: `${position.x + largeCursorOffset.x}px`,
          top: `${position.y + largeCursorOffset.y}px`,
        }}
      >
        {isLarge && !cursorText && (
          <div className={styles.cursorContent}>
            <span className={styles.cursorText}>Next</span>
            <span className={styles.cursorArrow}>→</span>
          </div>
        )}
      </div>
    )
  );
};

export default CustomCursor;
