import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Steps.module.css";
import { useProvider } from "../context/AppContext";
import { steps } from "../data/steps";

function Steps() {
  const { progress: currentStep } = useProvider();

  const blocksRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    for (let i = 0; i < currentStep; i++) {
      tl.to(linesRef.current[i], {
        "--width": "60px",
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(
        blocksRef.current[i],
        {
          scale: 1.05,
          duration: 0.2,
          ease: "power1.inOut",
        },
        "<"
      );

      tl.to(blocksRef.current[i], {
        scale: 1,
        duration: 0.2,
        ease: "power1.inOut",
      });
    }

    tl.to(blocksRef.current[currentStep], {
      scale: 1.1,
      duration: 0.5,
      ease: "sine.inOut",
    });
    tl.to(blocksRef.current[currentStep], {
      scale: 1,
      duration: 0.5,
      ease: "sine.inOut",
    });
  }, [currentStep]);

  return (
    <div className={styles.container}>
      <div className={styles.progressWrapper}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className={styles.stepWrapper} data-testid="step-wrapper">
              <div
                className={`${styles.stepGlass} ${
                  i < currentStep ? styles.completed : ""
                } ${i === currentStep ? styles.current : ""}`}
                ref={(el) => {
                  blocksRef.current[i] = el!;
                }}
              >
                <span className={styles.icon}>{step.icon}</span>
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
            {i !== steps.length - 1 && (
              <div
                className={styles.stepLine}
                ref={(el) => {
                  linesRef.current[i] = el!;
                }}
                 data-testid="step-line"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Steps;
