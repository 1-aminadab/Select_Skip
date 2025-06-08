import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./TextAnimation.css";

interface TextAnimationProps {
  text: string;
  size?: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text, size }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll(".char");
    if (chars) {
      gsap.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
          rotate: 45,
          scale: 0.2,
          color: "#ff0055",
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          scale: 1,
          color: "rgb(255, 238, 0)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.07,
        }
      );

      gsap.to(chars, {
        textShadow: "0px 0px 20px rgb(0, 132, 255)",
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "sine.inOut",
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true,
        },
      });
    }
  }, [text]);

  return (
    <div className="insane-container">
      <div className="text" ref={containerRef} style={{ fontSize:size }}>
        {[...text].map((char, i) => (
          <span className="char" key={i}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextAnimation;
