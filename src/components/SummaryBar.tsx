import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './SummaryBar.module.css';

const SummaryBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );

    gsap.from(buttonRefs.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.4,
    });
  }, []);

  return (
    <div className={styles.fixedBar} ref={barRef}>
      <div className={styles.summaryContainer}>
        <p className={styles.notice}>
          Imagery and information shown may not reflect exact shape or size. Options and accessories may cost extra.
        </p>

        <div className={styles.content}>
          <div className={styles.skipInfo}>
            <span className={styles.skipTitle}>4 Yard Skip</span>
            <span className={styles.skipPrice}>£211</span>
            <span className={styles.skipDuration}>14 day hire</span>
          </div>

          <div className={styles.buttonGroup}>
            <button
              ref={(el) => (buttonRefs.current[0] = el)}
              className={styles.outlinedBtn}
            >
              ← Back
            </button>
            <button
              ref={(el) => (buttonRefs.current[1] = el)}
              className={styles.animatedBtn}
            >
              Continue <span className={styles.arrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBar;
