import React from 'react';
import { motion } from 'motion/react';

export const Work = () => {
  const campaignStats = [
    { brand: "ZUNO", stat: "3,000–5,000", label: "Verified Actions", color: "bg-pink" },
    { brand: "GEMINI", stat: "1,510", label: "New Members Joined", color: "bg-lime" },
    { brand: "EATSURE", stat: "1,500+", label: "Verified Actions", color: "bg-blue-500" },
    { brand: "SUNRISE", stat: "1,624", label: "Verified Actions", color: "bg-yellow-400" },
    { brand: "DISTRICT APP", stat: "4,000+", label: "Instagram Stories", color: "bg-purple-500" },
    { brand: "ISPL", stat: "300+", label: "Conversions", color: "bg-orange-500" },
    { brand: "DELL GAMING", stat: "750+", label: "Participants", color: "bg-emerald-400" },
    { brand: "ASUS", stat: "300+", label: "Participants", color: "bg-cyan-400" },
    { brand: "HP GAMING", stat: "1,200+", label: "Participants", color: "bg-orange-600" }
  ];

  return (
    <div className="bg-black min-h-screen py-[6rem] px-[1.5em] md:px-[5em]">
      <h1 className="text-[3.5rem] md:text-[6.5rem] leading-none mb-[3rem] whitespace-nowrap text-white">THE WORK.</h1>
      <p className="text-lime text-[1.25rem] mb-[5rem] font-body">// Measurable outcomes. Real communities. Verified results.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2.5rem]">
        {campaignStats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`brutal-card p-[2.5em] flex flex-col justify-between h-[18.75rem] ${item.color}`}
          >
            <div className="text-[1.5rem] font-zine text-black border-b-[0.125rem] border-black pb-[0.5rem] mb-[1rem]">{item.brand}</div>
            <div className="text-[4.5rem] font-display text-black leading-none">{item.stat}</div>
            <div className="text-[1.25rem] font-zine text-black/80 mt-[0.5rem]">{item.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-[8rem] border-t-[0.3125rem] border-pink pt-[5rem]">
        <h2 className="text-[3.75rem] md:text-[5rem] mb-[3rem] uppercase text-white">Event Marketing</h2>
        <div className="space-y-[2rem] mb-[5rem]">
          {[
            "QS Study Abroad Fair – 500+ student visits across 6 cities",
            "WPL Speed Queen – Regional event marketing with 200+ participants"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-[1.5rem] group cursor-default">
              <div className="w-[1rem] h-[1rem] bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-[1.5rem] md:text-[1.875rem] font-body group-hover:translate-x-[0.5rem] transition-transform text-white">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-[3.75rem] md:text-[5rem] mb-[3rem] uppercase text-white">Gaming Events</h2>
        <div className="space-y-[2rem] mb-[5rem]">
          {[
            "Dell Gaming – Event marketing & influencer management across 9 cities",
            "ASUS & HP Gaming – Multi-city event marketing and management"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-[1.5rem] group cursor-default">
              <div className="w-[1rem] h-[1rem] bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-[1.5rem] md:text-[1.875rem] font-body group-hover:translate-x-[0.5rem] transition-transform text-white">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-[3.75rem] md:text-[5rem] mb-[3rem] uppercase text-white">Influencer Marketing</h2>
        <div className="space-y-[2rem] mb-[5rem]">
          {[
            "SHEIN – Influencer engagement at IIT Bombay (Mood Indigo)"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-[1.5rem] group cursor-default">
              <div className="w-[1rem] h-[1rem] bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-[1.5rem] md:text-[1.875rem] font-body group-hover:translate-x-[0.5rem] transition-transform text-white">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-[3.75rem] md:text-[5rem] mb-[3rem] uppercase text-white">Campus Activation</h2>
        <div className="space-y-[2rem]">
          {[
            "Gujarat Titans (IPL) – College-level marketing initiative"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-[1.5rem] group cursor-default">
              <div className="w-[1rem] h-[1rem] bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-[1.5rem] md:text-[1.875rem] font-body group-hover:translate-x-[0.5rem] transition-transform text-white">{exp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
