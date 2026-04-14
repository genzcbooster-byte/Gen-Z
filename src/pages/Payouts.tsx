import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LEADERBOARD_DATA } from '../data/leaderboard';

export const Payouts = () => {
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

      <div className="brutal-card bg-white p-[2em] md:p-[3em] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Trophy size="8rem" className="text-pink" />
        </div>
        
        <div className="space-y-[1rem]">
          {LEADERBOARD_DATA.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: (i % 10) * 0.05 }}
              viewport={{ once: true }}
              className={`flex items-center justify-between p-[1.5em] brutal-border ${
                i === 0 ? 'bg-pink text-white' : 
                i === 1 ? 'bg-lime text-black' : 
                i === 2 ? 'bg-blue-400 text-black' : 
                'bg-cream text-black'
              } group hover:translate-x-2 transition-transform`}
            >
              <div className="flex items-center gap-[1.5rem] md:gap-[3rem]">
                <span className="font-display text-[2rem] md:text-[3rem] w-[3rem]">{entry.rank}.</span>
                <div className="flex flex-col">
                  <span className="font-display text-[2rem] md:text-[3.5rem] leading-none">{entry.name}</span>
                  <span className="text-[0.75rem] font-bold opacity-60 uppercase tracking-widest">{entry.location || "India"}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="font-display text-[2rem] md:text-[3.5rem] leading-none">{entry.earned}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
