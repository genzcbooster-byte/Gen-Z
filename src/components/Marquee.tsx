import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const Marquee = ({ text, speed = 30, reverse = false, className = "" }: { text: string, speed?: number, reverse?: boolean, className?: string }) => {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap brutal-border-y py-2", className)}>
      <motion.div
        className="inline-block"
        animate={{ x: reverse ? [0, 1000] : [0, -1000] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-[1.5rem] font-display uppercase px-[1em]">{text}</span>
        <span className="text-[1.5rem] font-display uppercase px-[1em]">{text}</span>
        <span className="text-[1.5rem] font-display uppercase px-[1em]">{text}</span>
        <span className="text-[1.5rem] font-display uppercase px-[1em]">{text}</span>
      </motion.div>
    </div>
  );
};
