import React from 'react';
import SkipCard from '../components/SkipCard';
import styles from './styles/SelectSkip.module.css';
import { skipData } from '../data/skipData';
import { useProvider } from '../context/AppContext';

const SelectSkip: React.FC = () => {
  const { selectedSkipId, setSelectedSkipId } = useProvider();

  const handleSelect = (id: number) => {
    if (skipData.find(skip => skip.id === id)?.disabled) return;
    setSelectedSkipId(id);
  };

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>Choose Your Skip Size</h1>
        <h3 className={styles.subheading}>Select the skip size that best suits your needs</h3>
      </div>

      <div className={styles.cardsGrid}>
        {skipData.map((skip) => (
          <SkipCard
            key={skip.id}
            skipData={skip}
            selected={skip.id === selectedSkipId}
            disabled={!skip.allowed_on_road}
            onSelect={() => handleSelect(skip.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectSkip;
