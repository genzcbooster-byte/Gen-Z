import React from 'react';
import { motion } from 'motion/react';
import { Zap, ArrowRight, Trophy, TrendingUp } from 'lucide-react';
import { LEADERBOARD_DATA } from '../data/leaderboard';

const Leaderboard = () => {
  return (
    <div className="brutal-card bg-white p-[2em] md:p-[3em] mb-[5rem] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Trophy size="8rem" className="text-pink" />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[3rem] gap-4">
        <div>
          <h2 className="text-[3rem] md:text-[4.5rem] leading-tight text-black">HALL OF FAME.</h2>
          <p className="text-pink font-zine text-[1rem] md:text-[1.25rem] tracking-widest uppercase">
            // THE TOP EARNERS IN THE ECOSYSTEM.
          </p>
        </div>
        <div className="bg-lime text-black px-4 py-2 brutal-border font-bold flex items-center gap-2">
          <TrendingUp size="1.25rem" /> LIVE UPDATES
        </div>
      </div>

      <div className="space-y-[1rem]">
        {LEADERBOARD_DATA.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
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
                <span className="font-display text-[1.5rem] md:text-[2.5rem] leading-none">{entry.name}</span>
                <span className="text-[0.75rem] font-bold opacity-60 uppercase tracking-widest">Verified Ambassador</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-display text-[2rem] md:text-[3.5rem] leading-none">{entry.earned}</span>
              <span className="text-[0.75rem] font-bold opacity-60 uppercase tracking-widest">Total Payout</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-[3rem] text-center">
        <p className="font-body text-[1rem] text-black/60 italic">
          Want to see your name here? Join the force and start building.
        </p>
      </div>
    </div>
  );
};

export const Students = () => {
  const options = [
    { 
      title: "GET A SPONSORSHIP", 
      desc: "Fuel your campus events with the right brand backing. We bridge the gap between your vision and brand budgets.", 
      color: "bg-pink", 
      link: "https://wa.me/9316106151?text=I'm%20looking%20for%20a%20sponsorship%20for%20my%20campus%20event." 
    },
    { 
      title: "WANNA WORK AT GENZVERSE", 
      desc: "Join the force. Build movements. Scale potential. We're always looking for the brightest minds to lead our campus networks.", 
      color: "bg-lime", 
      link: "https://wa.me/9316106151?text=I'm%20interested%20in%20working%20at%20Genzverse." 
    },
    { 
      title: "WANNA EXPERIENCE EVENTS WITH GENZVERSE", 
      desc: "Get exclusive access to the most high-octane events in the country. From gaming arenas to tech takeovers.", 
      color: "bg-blue-400", 
      link: "https://wa.me/9316106151?text=I%20want%20to%20experience%20Genzverse%20events." 
    }
  ];

  return (
    <div className="bg-black min-h-screen py-[6rem] px-[1.5em] md:px-[5em] flex flex-col">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-[3rem]"
      >
        <h1 className="text-[3.5rem] md:text-[6.5rem] leading-none text-white">STUDENTS.</h1>
        <p className="text-lime text-[1.25rem] font-body tracking-widest mt-4">// YOUR GATEWAY TO THE ECOSYSTEM.</p>
      </motion.div>

      <Leaderboard />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2rem] flex-grow">
        {options.map((opt, i) => (
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

