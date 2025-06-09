import React, { useEffect, useRef } from 'react';
import styles from './styles/SkipCard.module.css';
import skipImage from '../assets/images/skip.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SkipData } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface SkipCardProps {
  skipData: SkipData;
  selected?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skipData, disabled, selected, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);


  return (
    <div
      ref={cardRef}
      className={`${styles.skipCard} 
        ${selected ? styles.selected : ''} 
        ${disabled ? styles.disabled : ''}`}
      title={disabled ? skipData.tooltip : ''}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div className={styles.shimmer} />
      <div className={styles.cardOverlay} />

      <div className={styles.cardContent} >
        <img src={skipImage} alt="Skip" className={styles.skipImg} style={{filter: disabled ? 'grayscale(100%)' : 'none'}}/>

        <h3 className={styles.skipTitle} style={{filter: disabled ? 'grayscale(100%)' : 'none'}}>{skipData.size} Yard Skip</h3>
        <p className={styles.skipSubtext} style={{filter: disabled ? 'grayscale(100%)' : 'none'}}>Perfect for household waste</p>
        <p className={styles.skipPrice} style={{filter: disabled ? 'grayscale(100%)' : 'none'}}>£{Math.round(skipData.price_before_vat)}</p>

          <div className={styles.warningMessages}>
              <div className={styles.warningMessage}>
                {!skipData.allowed_on_road && (
                  <div style={{display:'flex', gap:10}}>
                    <span role="img" aria-label="Road restriction">🚫</span>
                    <span style={{ color: 'red', filter: 'none' }}>Road restriction</span>

                  </div>

                )}
                {!skipData.allows_heavy_waste && (
                  <div style={{display:'flex', gap:10}}>
                    <span role="img" aria-label="Heavy waste restriction">⚠️</span>
                   <span style={{ color: 'yellow', filter: 'none' }}>Heavy waste restriction</span>                  </div>

                )}
              </div>
          </div>
        

        <button className={styles.selectBtn} disabled={disabled} onClick={!disabled ? onSelect : undefined}
        >
          {selected ? 'Selected' : 'Select'} <span className={styles.arrow}>{!selected && '→'}</span>
        </button>

        {selected && <div className={styles.badge}>Selected</div>}
      </div>
    </div>
  );
};

export default SkipCard;