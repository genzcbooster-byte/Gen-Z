import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Users, Trophy, Megaphone, Rocket, Sparkles, Globe } from 'lucide-react';
import { Marquee } from '../components/Marquee';
import { SlotCounter } from '../components/SlotCounter';
import { STATS, BRANDS, BLOG_POSTS, CITIES } from '../constants';

export const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-screen bg-black flex flex-col md:flex-row items-center justify-center md:justify-between px-[1.5em] md:px-[5em] relative overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-pattern-grid text-white/5 opacity-20" />
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[5rem] -left-[5rem] w-[37.5rem] h-[37.5rem] bg-pink/10 blur-[7.5rem] rounded-full"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[5rem] -right-[5rem] w-[31.25rem] h-[31.25rem] bg-lime/10 blur-[6.25rem] rounded-full"
          />
          <div className="absolute inset-0 bg-pattern-dots text-lime/10 opacity-30" />
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[0.125rem] bg-lime/20 shadow-[0_0_0.9375rem_rgba(143,204,0,0.5)] z-0"
          />
        </div>

        <div className="z-10 flex flex-col items-center md:items-start md:w-3/5">
          <div className="inline-block bg-lime text-black px-[0.75rem] py-[0.25rem] brutal-border brutal-shadow mb-[1.5rem] text-[0.6rem] md:text-[0.75rem] font-bold">
            YOUTH-LED CAMPAIGN FORCE.
          </div>
          <h1 className="text-[3.2rem] md:text-[4.9rem] leading-[0.9] mb-[1.5rem] p-[0.5rem]">
            WE DON'T <br />
            SELL ADS. <br />
            <span className="text-pink glitch-text">WE BUILD MOVEMENTS.</span>
          </h1>
          <p className="text-cream/70 text-[1.06rem] md:text-[1.1rem] mb-[2.5rem] max-w-[32rem]">
            // Scaling Potential
          </p>
          <div className="flex flex-col sm:flex-row gap-[1rem]">
            <Link 
              to="/work"
              className="px-[2rem] py-[0.75rem] border-[0.1875rem] border-cream text-cream font-zine text-[1.56rem] md:text-[1.44rem] hover:bg-cream hover:text-black transition-colors"
            >
              SEE OUR WORK ↓
            </Link>
          </div>
        </div>

        <div className="hidden md:flex md:w-2/5 justify-center items-center mt-[3rem] md:mt-0">
          <div className="relative z-10 text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center opacity-20"
            >
              <div className="w-[31.25rem] h-[31.25rem] border-dashed border-[0.25rem] border-lime rounded-full" />
              <div className="absolute w-[25rem] h-[25rem] border-dashed border-[0.125rem] border-pink rounded-full" />
            </motion.div>

            <motion.div 
              animate={{ 
                y: [-10, 10, -10],
                rotate: [-2, 2, -2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[8rem] md:text-[12rem] font-display leading-none select-none flex items-center justify-center relative z-10"
            >
              <img 
                src="https://i.postimg.cc/cCN86MQF/Untitled-design-3-removebg-preview.png" 
                alt="GENZVERSE" 
                className="w-[15rem] md:w-[20rem] h-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-lime text-black">
          <Marquee text="GENZVERSE • INDIA'S #1 STUDENT MARKETING ECOSYSTEM • SINCE MAY 2024 • CAMPUS TO CAMPAIGN • VERIFIED RESULTS • " />
        </div>
      </section>

      {/* Stats Slam */}
      <section className="bg-cream text-black py-[4em] px-[1.5em] md:px-[5em] brutal-border-y-[0.3125rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[16rem] h-[16rem] bg-pink/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[8rem]" />
        <div className="flex flex-col items-center text-center mb-[3rem]">
          <h2 className="text-[2.5rem] md:text-[4.5rem] mb-[0.5rem] italic relative z-10 whitespace-nowrap">THE RESULTS.</h2>
          <div className="w-[6rem] h-[0.375rem] bg-pink relative z-10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem] relative z-10 mb-[4rem]">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`brutal-card p-[2em] relative group ${stat.color} flex flex-col items-center text-center`}
            >
              <div className="text-[3rem] md:text-[4.5rem] font-space font-bold text-black mb-[0.5rem] drop-shadow-[0.125rem_0.125rem_0_white] leading-none">
                <SlotCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[1.25rem] font-zine leading-tight text-black uppercase">{stat.label}</div>
              <div className="absolute -top-[0.75rem] -right-[0.75rem] bg-black text-white px-[0.5rem] py-[0.125rem] text-[0.625rem] font-accent rotate-6 brutal-border shadow-[0.125rem_0.125rem_0_#8FCC00]">
                {stat.note}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center relative z-10">
          <Link 
            to="/zine"
            className="bg-black text-cream px-[3rem] py-[1.25rem] brutal-border-pink brutal-shadow-lime font-zine text-[1.5rem] hover:-translate-y-[0.25rem] transition-transform"
          >
            SEE OUR CASE STUDIES →
          </Link>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-black py-[4em] px-[1.5em] md:px-[5em] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid text-white/5 opacity-10 pointer-events-none" />
        <div className="flex flex-col items-center text-center mb-[4rem]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.5rem] md:text-[4.5rem] font-display relative z-10 whitespace-nowrap text-white"
          >
            WHAT WE <span className="text-pink">ACTUALLY</span> DO.
          </motion.h2>
        </div>

        <div className="flex flex-wrap border-cream/10 border relative z-10 mx-auto max-w-[80rem]">
          {[
            { title: "COMMUNITY & CAMPUS", body: "The ecosystem backbone. Connecting brands with students through peer-driven engagement inside college ecosystems.", icon: Users, tag: "ECOSYSTEM", color: "lime" },
            { title: "EVENTS & EXPERIENCES", body: "Live, on-ground youth engagements designed for high recall and physical brand interaction.", icon: Trophy, tag: "LIVE", color: "pink" },
            { title: "CONTENT & MEDIA", body: "Campaign amplification layer ensuring authentic youth storytelling and bulk promotion.", icon: Megaphone, tag: "AMPLIFY", color: "lime" },
            { title: "BRAND SOLUTIONS", body: "The commercial engine. Solving brand objectives through outcome-driven youth campaigns.", icon: Rocket, tag: "GROWTH", color: "pink" },
            { title: "TALENT & CREATORS", body: "Relevant youth voices for campaigns and live engagements. Campaign-specific creator activation.", icon: Sparkles, tag: "PEOPLE", color: "lime" },
            { title: "TSF – THE SAMVIDHAN FORUM", body: "Purpose-led vertical focused on youth awareness, dialogue, and institutional engagement.", icon: Globe, tag: "PURPOSE", color: "cream" }
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-full md:w-1/3 p-[2em] border border-cream/10 relative overflow-hidden group hover:bg-white/5 transition-colors flex flex-col min-h-[20rem]"
            >
              <div className="absolute top-[1.5rem] right-[1.5rem] text-[6rem] font-display text-white/5 leading-none select-none pointer-events-none">
                0{i+1}
              </div>
              <div className={`inline-block border px-[0.5rem] py-[0.125rem] mb-[2rem] text-[0.625rem] font-bold font-sans w-fit relative z-10 ${
                service.color === 'lime' ? 'border-lime text-lime' : 
                service.color === 'pink' ? 'border-pink text-pink' : 
                'border-cream text-cream'
              }`}>
                [{service.tag}]
              </div>
              <div className="relative z-10 mb-[2rem] text-lime group-hover:scale-110 transition-transform duration-300">
                <service.icon size="2.5rem" strokeWidth={1.5} />
              </div>
              <h3 className="text-[1.75rem] mb-[1rem] font-display uppercase tracking-tight leading-none relative z-10 group-hover:text-white transition-colors text-white">
                {service.title}
              </h3>
              <p className="text-cream/50 text-[0.8rem] font-sans leading-relaxed max-w-[20rem] relative z-10">
                {service.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Wall */}
      <section className="bg-cream text-black py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-blueprint opacity-10 pointer-events-none" />
        <div className="flex flex-col items-center text-center mb-[2rem]">
          <h2 className="text-[2.5rem] md:text-[4.5rem] px-[0.4em] md:px-[0.75em] mb-[1.5rem] relative z-10 whitespace-nowrap">BRANDS WE'VE MOVED.</h2>
        </div>
        <div className="relative z-10">
          <Marquee text={BRANDS.map(b => b.name).join(" • ")} speed={40} className="bg-white border-y-[0.1875rem] border-black py-2" />
        </div>

        <div className="mt-[3rem] px-[1.5em] md:px-[5em] relative z-10 flex justify-center">
          <div className="bg-pink brutal-border p-[2em] flex flex-col md:flex-row justify-between items-center gap-[2rem] relative shadow-brutal max-w-[60rem] w-full">
            <div className="absolute inset-0 opacity-20 bg-pattern-diagonal text-black" />
            <div className="z-10 text-center md:text-left relative">
              <div className="absolute -top-[1.25rem] left-0 md:left-0 bg-lime text-black px-[0.75rem] py-[0.125rem] text-[0.625rem] font-bold brutal-border shadow-[0.125rem_0.125rem_0_black] uppercase">
                Let's build a movement.
              </div>
              <h3 className="text-[2.5rem] md:text-[3.5rem] drop-shadow-[0.125rem_0.125rem_0_white]">YOUR BRAND NEXT?</h3>
            </div>
            <a 
              href="https://wa.me/9316106151" 
              target="_blank" 
              rel="noopener noreferrer"
              className="z-10 bg-black text-cream px-[2rem] py-[1rem] brutal-border-cream brutal-shadow-pink font-zine text-[1.25rem] hover:-translate-y-[0.25rem] transition-transform"
            >
              → CONTACT US
            </a>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="bg-black py-[4em] px-[1.5em] md:px-[5em]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-[3rem] gap-[2rem] text-center md:text-left">
          <div className="w-full flex flex-col items-center md:items-start">
            <h2 className="text-[2.5rem] md:text-[4.5rem] leading-none font-display whitespace-nowrap text-white">OUR TURF.</h2>
            <p className="text-lime font-body mt-[0.5rem] text-[0.875rem] md:text-[1rem] uppercase tracking-wider">// Tier-1 and Tier-2 penetration. 15+ cities and counting.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[1rem]">
          {CITIES.map((city, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="brutal-card bg-zinc-900 border-cream/20 p-[1rem] group hover:bg-pink hover:border-black transition-all cursor-default min-h-[8rem] flex flex-col justify-between"
            >
              <div>
                <div className="text-[0.625rem] font-display text-lime group-hover:text-black mb-[0.25rem]">0{i+1}</div>
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-display text-cream group-hover:text-black transition-colors truncate">{city.name}</h3>
              </div>
              <div className="mt-[0.5rem] pt-[0.5rem] border-t border-cream/10 group-hover:border-black/20">
                <div className="text-[0.625rem] font-bold text-lime group-hover:text-black uppercase">{city.stat}</div>
              </div>
            </motion.div>
          ))}
          <div className="brutal-card bg-lime border-black p-[1rem] flex items-center justify-center text-center group hover:bg-white transition-colors min-h-[8rem]">
            <div className="font-display text-black text-[1rem] md:text-[1.25rem] leading-tight">AND <br />MANY <br />MORE.</div>
          </div>
        </div>
      </section>
    </div>
  );
};
