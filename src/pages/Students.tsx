import React from 'react';
import { motion } from 'motion/react';
import { Zap, ArrowRight, Trophy, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LEADERBOARD_DATA } from '../data/leaderboard';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawStudents from '../content/students.md?raw';
const { data: studentsData } = parseMD(rawStudents);

const Leaderboard = () => {
  return (
    <div className="bg-black/40 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-[2em] md:p-[3em] mb-[5rem] relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Trophy size="8rem" className="text-white" />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[3rem] gap-4 relative z-10">
        <div>
          <h2 className="text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-display">{studentsData.leaderboard_heading || "HALL OF FAME."}</h2>
          <p className="text-white/60 font-zine text-[1rem] md:text-[1.25rem] tracking-widest uppercase">
            {studentsData.leaderboard_subtitle || "// THE TOP EARNERS IN THE ECOSYSTEM."}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
          <TrendingUp size="1.25rem" /> {studentsData.leaderboard_status || "LIVE UPDATES"}
        </div>
      </div>

      <div className="space-y-[1rem] relative z-10">
        {LEADERBOARD_DATA.slice(0, 10).map((entry, i) => {
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
              transition={{ delay: i * 0.05 }}
              className={baseGlass}
            >
              <div className="flex items-center gap-[0.25rem] md:gap-[0.5rem]">
                <span className={`font-display text-[2rem] md:text-[2.5rem] lg:text-[3rem] w-fit min-w-[1.5rem] md:min-w-[2.5rem] ${i < 3 ? 'text-white' : 'text-white/60'}`}>
                  {entry.rank}.
                </span>
                <div className="flex flex-col">
                  <span className={`font-display text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] leading-none text-white`}>{entry.name}</span>
                  <span className="text-[0.75rem] font-bold text-white/50 uppercase tracking-widest">{entry.location || "India"}</span>
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
          className="inline-flex items-center justify-center py-4 px-8 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 font-zine text-[1.25rem] hover:bg-white/20 transition-all gap-3 uppercase shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          {studentsData.leaderboard_cta || "VIEW ALL PAYOUTS"} <ArrowRight size="1.5rem" />
        </Link>
        <p className="font-body text-[1rem] text-white/60 italic mt-4">
          {studentsData.leaderboard_cta_note || "Want to see your name here? Join the force and start building."}
        </p>
      </div>
    </div>
  );
};

export const Students = () => {
  useSEO({
    title: "Students Hub | Join the Genzverse Force",
    description: "Your gateway to the ecosystem. Get sponsorships, work at Genzverse, and experience high-octane events while building your career.",
    keywords: "student earning opportunities, campus ambassador job, college student sponsorships india"
  });

  return (
    <div className="bg-black min-h-screen py-[6rem] px-[1.5em] md:px-[5em] flex flex-col">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-[3rem]"
      >
        <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-none text-white">{studentsData.hero_title || "STUDENTS."}</h1>
        <p className="text-lime text-[1.25rem] font-body tracking-widest mt-4">{studentsData.hero_subtitle || "// YOUR GATEWAY TO THE ECOSYSTEM."}</p>
      </motion.div>

      <Leaderboard />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2rem] flex-grow">
        {(studentsData.options || []).map((opt: any, i: number) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`brutal-card p-[2.5em] flex flex-col h-full ${opt.color} group relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
              <Zap size="6rem" />
            </div>
            
            <div className="flex-grow flex flex-col">
              <h2 className="text-[2.5rem] font-display text-black leading-tight mb-6 group-hover:text-white transition-colors relative z-10">
                {opt.title}
              </h2>
              <p className="text-black/80 font-body text-[1.1rem] mb-8 font-medium leading-relaxed relative z-10">
                {opt.desc}
              </p>
            </div>

            <div className="mt-auto relative z-10">
              <a
                href={opt.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-4 bg-black text-cream brutal-border-white brutal-shadow-black font-zine text-[1.25rem] group-hover:bg-white group-hover:text-black transition-all gap-3"
              >
                APPLY NOW <ArrowRight size="1.5rem" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

