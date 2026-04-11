import React from 'react';
import { motion } from 'motion/react';
import { Zap, ArrowRight } from 'lucide-react';

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
