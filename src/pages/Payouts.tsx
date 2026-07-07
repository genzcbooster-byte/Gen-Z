import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LEADERBOARD_DATA } from '../data/leaderboard';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawStudents from '../content/students.md?raw';
const { data: studentsData } = parseMD(rawStudents);

export const Payouts = () => {
  useSEO({
    title: "Leaderboard | Genzverse Force Earners",
    description: "The full list of top student earners in the Genzverse ecosystem. Transparency, impact, and rewards for the next generation.",
    keywords: "student payouts, genzverse earnings, campus marketing rewards"
  });
  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen py-[6rem] px-[1.5em] md:px-[5em] flex flex-col text-black dark:text-white transition-colors duration-300">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-[3rem]"
      >
        <Link to="/students" className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors mb-4 font-zine uppercase tracking-widest">
          <ArrowLeft size="1.25rem" /> {studentsData.payouts_back_button || "BACK TO STUDENTS"}
        </Link>
        <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-none text-black dark:text-white transition-colors">{studentsData.payouts_title || "ALL PAYOUTS."}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-[1.25rem] font-body tracking-widest mt-4 transition-colors">{studentsData.payouts_subtitle || "// THE FULL LIST OF GENZVERSE EARNERS."}</p>
      </motion.div>

      <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-black/10 dark:border-white/10 p-[2em] md:p-[3em] relative overflow-hidden rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] transition-colors duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Trophy size="8rem" className="text-black dark:text-white" />
        </div>
        
        <div className="space-y-[1rem] relative z-10">
          {LEADERBOARD_DATA.map((entry, i) => {
            // iOS 26 Glassmorphism row styling
            const baseGlass = "bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-[1.2em] sm:p-[1.5em] flex items-center justify-between gap-4 md:gap-6 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:-translate-y-1";
            
            let amountGradientStyles = "text-zinc-800 dark:text-zinc-200";
            
            if (i === 0) {
              amountGradientStyles = "text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FF4500] font-extrabold drop-shadow-[0_0_10px_rgba(218,165,32,0.3)]";
            } else if (i === 1) {
              amountGradientStyles = "text-transparent bg-clip-text bg-gradient-to-r from-[#008B8B] via-[#0080FF] to-[#8A2BE2] font-extrabold drop-shadow-[0_0_10px_rgba(0,139,139,0.3)]";
            } else if (i === 2) {
              amountGradientStyles = "text-transparent bg-clip-text bg-gradient-to-r from-[#C71585] to-[#FF69B4] font-extrabold drop-shadow-[0_0_10px_rgba(199,21,133,0.3)]";
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
                <div className="flex items-center gap-[0.5rem] md:gap-[0.75rem] min-w-0 flex-1">
                  <span className={`font-soehne font-bold text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] tracking-tight w-fit min-w-[1.2rem] sm:min-w-[2.5rem] ${i < 3 ? 'text-black dark:text-white' : 'text-zinc-400 dark:text-zinc-500'} transition-colors`}>
                    {entry.rank}.
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-canela font-extrabold text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.8rem] leading-none text-black dark:text-white transition-colors truncate`}>{entry.name}</span>
                    <span className="text-[0.65rem] sm:text-[0.75rem] font-soehne font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1.5 transition-colors">{entry.location || "India"}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center shrink-0">
                  <span className={`font-soehne font-extrabold text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.8rem] leading-none ${amountGradientStyles} transition-all duration-300`}>
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
