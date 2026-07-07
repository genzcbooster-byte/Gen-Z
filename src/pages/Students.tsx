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
    <div className="bg-black border border-white/10 rounded-[2rem] p-[2em] md:p-[3em] mb-[5rem] relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Trophy size="8rem" className="text-white" />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[3rem] gap-4 relative z-10">
        <div>
          <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-none text-white font-canela font-bold tracking-tight">
            HALL OF <span className="italic font-light text-zinc-400">Fame.</span>
          </h2>
          <p className="text-zinc-400 font-soehne text-[0.8rem] md:text-[0.9rem] tracking-widest uppercase font-bold mt-2">
            {studentsData.leaderboard_subtitle || "// THE TOP EARNERS IN THE COMMUNITY."}
          </p>
        </div>
        <div className="bg-white/10 text-white border border-white/15 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-sm">
          <TrendingUp size="1.25rem" /> {studentsData.leaderboard_status || "LIVE UPDATES"}
        </div>
      </div>

      <div className="space-y-[1rem] relative z-10">
        {LEADERBOARD_DATA.slice(0, 10).map((entry, i) => {
          // iOS 26 Glassmorphism row styling
          const baseGlass = "bg-white/5 border border-white/10 rounded-2xl p-[1.2em] sm:p-[1.5em] flex items-center justify-between gap-4 md:gap-6 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:-translate-y-1";
          
          let amountGradientStyles = "text-zinc-200";
          
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
              <div className="flex items-center gap-[0.5rem] md:gap-[0.75rem] min-w-0 flex-1">
                <span className={`font-soehne font-bold text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] tracking-tight w-fit min-w-[1.2rem] sm:min-w-[2.5rem] ${i < 3 ? 'text-white' : 'text-zinc-500'} transition-colors`}>
                  {entry.rank}.
                </span>
                <div className="flex flex-col min-w-0">
                  <span className={`font-canela font-extrabold text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.8rem] leading-none text-white transition-colors truncate`}>{entry.name}</span>
                  <span className="text-[0.65rem] sm:text-[0.75rem] font-soehne font-bold text-zinc-400 uppercase tracking-widest mt-1.5 transition-colors">{entry.location || "India"}</span>
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
      
      <div className="mt-[3rem] text-center flex flex-col items-center gap-4 relative z-10">
        <Link 
          to={studentsData.leaderboard_cta_link || "/payouts"}
          className="inline-flex items-center justify-center py-4 px-8 bg-white/5 text-white border border-white/10 font-zine text-[1.25rem] hover:bg-white/10 transition-all gap-3 uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        >
          {studentsData.leaderboard_cta || "VIEW ALL PAYOUTS"} <ArrowRight size="1.5rem" />
        </Link>
        <p className="font-body text-[1rem] text-zinc-400 italic mt-4">
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

