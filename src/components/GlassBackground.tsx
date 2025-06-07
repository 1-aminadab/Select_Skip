import React, { ReactNode } from 'react';
import styles from './GlassBackground.module.css';

interface GlassBackgroundProps {
  children?: ReactNode;
}

const rows = 12;
const tilesPerRow = 20;

const GlassBackground: React.FC<GlassBackgroundProps> = ({ children }) => {
  const renderRow = (index: number) => {
    const directionClass = index % 2 === 0 ? styles.left : styles.right;
    const tiles = Array.from({ length: tilesPerRow }, (_, i) => (
      <div className={styles.tile} key={i}>
        <span className={styles.webflow}>REM</span>
        <span className={styles.gsap}>Waste</span>
      </div>
    ));

    return (
      <div className={`${styles.rowWrapper} ${directionClass}`} key={index}>
        <div className={styles.row}>
          {tiles}
          {tiles}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.backgroundContainer}>
      {Array.from({ length: rows }).map((_, i) => renderRow(i))}
      <div className={styles.glassCard}>
        {children}
      </div>
    </div>
  );
};

export default GlassBackground;
