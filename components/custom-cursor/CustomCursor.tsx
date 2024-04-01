'use client';

import React from 'react';
import { useCursor } from '../context/CursorContext';
import styles from './customcursor.module.scss';

interface CustomCursorProps {
  isLargeCursor?: boolean;
  cursorText?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isLargeCursor, cursorText }) => {
  const { position, hideCursor } = useCursor();
  const largeCursorOffset = isLargeCursor ? { x: -20, y: -20 } : { x: 0, y: 0 };

  return (
    !hideCursor && (
      <div
        className={`${styles.customCursor} ${isLargeCursor ? styles.largeCursor : ''}`}
        style={{
          left: `${position.x + largeCursorOffset.x}px`,
          top: `${position.y + largeCursorOffset.y}px`,
        }}
      >
        {isLargeCursor && !cursorText && (
          <div className={styles.cursorContent}>
            <span className={styles.cursorArrow} />
          </div>
        )}
      </div>
    )
  );
};

export default CustomCursor;
