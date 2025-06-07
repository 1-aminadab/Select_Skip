import React, { useState } from 'react';
import SkipCard from '../components/SkipCard';
import styles from './Home.module.css';
import { skipData } from '../data/skipData';

const Home: React.FC = () => {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(skipData[0].id);

  const handleSelect = (id: number) => {
    if (skipData.find(skip => skip.id === id)?.disabled) return; // prevent selecting disabled
    setSelectedSkipId(id);
  };

  return (
    <div className={styles.homeWrapper}>
      <div style={{ lineHeight: '0.5', alignItems:'center'}}>
        <h1 style={{fontSize:46, textAlign:'center'}}>Choose Your Skip Size</h1>
      <h3>Select the skip size that best suits your needs</h3>
      </div>

      <div className={styles.cardsGrid}>
        {skipData.map((skip) => (
          <SkipCard
            key={skip.id}
            skipData={skip}
            selected={skip.id === selectedSkipId}
            disabled={!skip.allowed_on_road }
            onSelect={() => handleSelect(skip.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;