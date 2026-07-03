import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Trophy, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LEADERBOARD_DATA } from '../data/leaderboard';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawStudents from '../content/students.md?raw';
const { data: studentsData } = parseMD(rawStudents);

const Leaderboard = () => {
  return (
    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[2rem] p-[2em] md:p-[3em] mb-[5rem] relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] transition-colors duration-300">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Trophy size="8rem" className="text-black dark:text-white" />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[3rem] gap-4 relative z-10">
        <div>
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-none text-black dark:text-white font-canela font-bold tracking-tight transition-colors">
            HALL OF <span className="italic font-light text-zinc-600 dark:text-zinc-400">Fame.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-soehne text-[0.8rem] md:text-[0.9rem] tracking-widest uppercase font-bold mt-2 transition-colors">
            {studentsData.leaderboard_subtitle || "// THE TOP EARNERS IN THE COMMUNITY."}
          </p>
        </div>
        <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md text-black dark:text-white border border-black/10 dark:border-white/10 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-sm transition-colors">
          <TrendingUp size="1.25rem" /> {studentsData.leaderboard_status || "LIVE UPDATES"}
        </div>
      </div>

      <div className="space-y-[1rem] relative z-10">
        {LEADERBOARD_DATA.slice(0, 10).map((entry, i) => {
          // iOS 26 Glassmorphism row styling
          const baseGlass = "bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-[1.5em] flex items-center justify-between transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:-translate-y-1";
          
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
              transition={{ delay: i * 0.05 }}
              className={baseGlass}
            >
              <div className="flex items-center gap-[0.25rem] md:gap-[0.5rem]">
                <span className={`font-display text-[2rem] md:text-[2.5rem] lg:text-[3rem] w-fit min-w-[1.5rem] md:min-w-[2.5rem] ${i < 3 ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  {entry.rank}.
                </span>
                <div className="flex flex-col">
                  <span className={`font-display text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] leading-none text-black dark:text-white transition-colors`}>{entry.name}</span>
                  <span className="text-[0.75rem] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest transition-colors">{entry.location || "India"}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className={`font-display text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] leading-none ${amountGradientStyles}`}>
                  {entry.earned}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-[3rem] text-center flex flex-col items-center gap-4 relative z-10">
        <Link 
          to={studentsData.leaderboard_cta_link || "/payouts"}
          className="inline-flex items-center justify-center py-4 px-8 bg-black/5 dark:bg-white/5 backdrop-blur-md text-black dark:text-white border border-black/10 dark:border-white/10 font-zine text-[1.25rem] hover:bg-black/10 dark:hover:bg-white/10 transition-all gap-3 uppercase shadow-[0_0_15px_rgba(0,0,0,0.05)] transition-colors"
        >
          {studentsData.leaderboard_cta || "VIEW ALL PAYOUTS"} <ArrowRight size="1.5rem" />
        </Link>
        <p className="font-body text-[1rem] text-zinc-500 dark:text-zinc-400 italic mt-4 transition-colors">
          {studentsData.leaderboard_cta_note || "Want to see your name here? Join the force and start building."}
        </p>
      </div>
    </div>
  );
};

export const Students = () => {
  useSEO({
    title: "Students Hub | Join the Genzverse Community",
    description: "Your gateway to the community. Get sponsorships, work at Genzverse, and experience high-octane events while building your career.",
    keywords: "student earning opportunities, campus ambassador job, college student sponsorships india"
  });

  return (
    <div className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white min-h-screen py-[6rem] px-[1.5em] md:px-[5em] flex flex-col transition-colors duration-300">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-[3rem] flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <div className="inline-block bg-black/5 dark:bg-white/5 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-6 text-[0.7rem] md:text-[0.75rem] font-soehne font-bold uppercase tracking-widest backdrop-blur-md transition-colors">
            {studentsData.hero_subtitle || "// YOUR GATEWAY TO THE COMMUNITY."}
          </div>
          <h1 className="font-canela text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-bold leading-[0.95] tracking-tight text-black dark:text-white transition-colors uppercase">
            {studentsData.hero_title || "STUDENTS."}
          </h1>
        </div>
        <Link
          to="/join-now"
          className="bg-black dark:bg-white text-white dark:text-black font-soehne font-bold uppercase tracking-widest text-xs px-8 py-4.5 rounded-full hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 w-fit"
        >
          JOIN THE COMMUNITY NOW →
        </Link>
      </motion.div>

      <div className="w-full">
        <Leaderboard />
      </div>
    </div>
  );
};

