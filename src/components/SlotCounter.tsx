import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface SlotCounterProps {
  value: string; // e.g. "1,00,000"
  suffix?: string;
}

export const SlotCounter = ({ value, suffix = "" }: SlotCounterProps) => {
  const [displayValue, setDisplayValue] = useState("");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      animate();
    }
  }, [isInView]);

  const animate = () => {
    const characters = "0123456789,";
    const target = value.split("");
    let iterations = 0;
    const maxIterations = 15;

    const interval = setInterval(() => {
      const nextValue = target.map((char, index) => {
        if (char === "," || char === ".") return char;
        if (iterations > index + 5) return char;
        return characters[Math.floor(Math.random() * 10)];
      }).join("");

      setDisplayValue(nextValue);

      if (iterations >= maxIterations + target.length) {
        setDisplayValue(value);
        clearInterval(interval);
      }
      iterations++;
    }, 50);

    return () => clearInterval(interval);
  };

  return (
    <span ref={containerRef} className="inline-block">
      {displayValue || value}
      {suffix}
    </span>
  );
};
