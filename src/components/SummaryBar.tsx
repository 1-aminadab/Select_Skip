import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './styles/SummaryBar.module.css';
import { useProvider } from '../context/AppContext';
import { steps } from '../data/steps';

const SummaryBar: React.FC = () => {  
  const { selectedSkip, progress, decrementProgress, incrementProgress } = useProvider();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  console.log("selected skip", selectedSkip);

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

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scroll down
        setShow(false);
      } else {
        // Scroll up
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className={styles.fixedBar} ref={barRef} style={{ display: show ? 'flex' : 'none' }}>
      <div className={styles.summaryContainer}>
        <p className={styles.notice}>
          Imagery and information shown may not reflect exact shape or size. Options and accessories may cost extra.
        </p>

        <div className={styles.content}>
          <div className={styles.skipInfo}>
            <span className={styles.skipTitle}>{selectedSkip?.size} Yard Skip</span>
            <span className={styles.skipPrice}>£{selectedSkip?.price_before_vat}</span>
            <span className={styles.skipDuration}>{selectedSkip?.hire_period_days} day hire</span>
          </div>

          <div className={styles.buttonGroup}>
            <button
              ref={(el) => { buttonRefs.current[0] = el; }}
              className={styles.outlinedBtn}
              style={{ display: progress === 0 ? 'none' : 'inline-block' }}
              onClick={decrementProgress}
            >
              ← Back
            </button>
            <button
              ref={(el) => { buttonRefs.current[1] = el; }}
              className={styles.animatedBtn}
              onClick={incrementProgress}
            >
              {progress === steps.length - 1 ? 'Submit' : 'Continue'} <span className={styles.arrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBar;
