import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const Marquee = ({ text, speed = 30, reverse = false, className = "" }: { text: string, speed?: number, reverse?: boolean, className?: string }) => {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap py-3 bg-black/5 dark:bg-white/5 border-y border-black/10 dark:border-white/10 text-black dark:text-white transition-colors duration-300", className)}>
      <motion.div
        className="inline-block"
        animate={{ x: reverse ? [0, 1000] : [0, -1000] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-[1rem] md:text-[1.1rem] font-soehne tracking-widest uppercase px-[2rem] text-current">{text}</span>
        <span className="text-[1rem] md:text-[1.1rem] font-soehne tracking-widest uppercase px-[2rem] text-current">{text}</span>
        <span className="text-[1rem] md:text-[1.1rem] font-soehne tracking-widest uppercase px-[2rem] text-current">{text}</span>
        <span className="text-[1rem] md:text-[1.1rem] font-soehne tracking-widest uppercase px-[2rem] text-current">{text}</span>
      </motion.div>
    </div>
  );
};
