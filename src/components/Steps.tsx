import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Steps.module.css";

const steps = [
  { icon: "📍", label: "Postcode" },
  { icon: "🗑️", label: "Waste Type" },
  { icon: "🚛", label: "Select Skip" },
  { icon: "🛡️", label: "Permit Check" },
  { icon: "📅", label: "Choose Date" },
  { icon: "💳", label: "Payment" },
];

function Steps() {
  const currentStep = 3;
  const blocksRef = useRef<any[]>([]);
  const linesRef = useRef<any[]>([]);

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
            <div className={styles.stepWrapper}>
              <div
                className={`${styles.stepGlass} ${
                  i < currentStep ? styles.completed : ""
                } ${i === currentStep ? styles.current : ""}`}
                ref={(el) => (blocksRef.current[i] = el)}
              >
                <span className={styles.icon}>{step.icon}</span>
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
            {i !== steps.length - 1 && (
              <div
                className={styles.stepLine}
                ref={(el) => (linesRef.current[i] = el)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Steps;
