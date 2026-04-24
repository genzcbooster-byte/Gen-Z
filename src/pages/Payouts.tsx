import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LEADERBOARD_DATA } from '../data/leaderboard';

import { useSEO } from '../hooks/useSEO';

export const Payouts = () => {
  useSEO({
    title: "Leaderboard | Genzverse Force Earners",
    description: "The full list of top student earners in the Genzverse ecosystem. Transparency, impact, and rewards for the next generation.",
    keywords: "student payouts, genzverse earnings, campus marketing rewards"
  });
  return (
    <div className="bg-black min-h-screen py-[6rem] px-[1.5em] md:px-[5em] flex flex-col">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-[3rem]"
      >
        <Link to="/students" className="inline-flex items-center gap-2 text-lime hover:text-pink transition-colors mb-4 font-zine uppercase tracking-widest">
          <ArrowLeft size="1.25rem" /> BACK TO STUDENTS
        </Link>
        <h1 className="text-[3.5rem] md:text-[6.5rem] leading-none text-white">ALL PAYOUTS.</h1>
        <p className="text-lime text-[1.25rem] font-body tracking-widest mt-4">// THE FULL LIST OF GENZVERSE EARNERS.</p>
      </motion.div>

      <div className="bg-black/40 backdrop-blur-3xl border border-white/20 p-[2em] md:p-[3em] relative overflow-hidden rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Trophy size="8rem" className="text-white" />
        </div>
        
        <div className="space-y-[1rem] relative z-10">
          {LEADERBOARD_DATA.map((entry, i) => {
            // iOS 26 Glassmorphism row styling
            const baseGlass = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-[1.5em] flex items-center justify-between transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1";
            
            let amountGradientStyles = "text-white/80";
            
            if (i === 0) {
              amountGradientStyles = "text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF4500] font-extrabold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]";
            } else if (i === 1) {
              amountGradientStyles = "text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#0080FF] to-[#8A2BE2] font-extrabold drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]";
            } else if (i === 2) {
              amountGradientStyles = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] to-[#FF69B4] font-extrabold drop-shadow-[0_0_10px_rgba(255,20,147,0.4)]";
            }
  
            return (
              <motion.div
                key={entry.id}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: (i % 10) * 0.05 }}
                viewport={{ once: true }}
                className={baseGlass}
              >
                <div className="flex items-center gap-[0.25rem] md:gap-[0.5rem]">
                  <span className={`font-display text-[2rem] md:text-[3rem] w-fit min-w-[1.5rem] md:min-w-[2.5rem] ${i < 3 ? 'text-white' : 'text-white/60'}`}>
                    {entry.rank}.
                  </span>
                  <div className="flex flex-col">
                    <span className={`font-display text-[2rem] md:text-[3.5rem] leading-none text-white`}>{entry.name}</span>
                    <span className="text-[0.75rem] font-bold text-white/50 uppercase tracking-widest">{entry.location || "India"}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className={`font-display text-[2rem] md:text-[3.5rem] leading-none ${amountGradientStyles}`}>
                    {entry.earned}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
