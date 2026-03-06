/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BLOG_POSTS, CITIES, STATS, BRANDS } from './constants';
import { BlogPost, Page } from './types';
import { 
  Users, 
  Trophy, 
  Megaphone, 
  Rocket, 
  Zap, 
  Target, 
  Heart, 
  Flame, 
  Sparkles, 
  Globe,
  ArrowRight,
  Instagram,
  MessageCircle,
  Linkedin,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .brutal-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor hidden md:block ${isHovering ? 'hovering' : ''}`}
      style={{ left: `${position.x / 16}rem`, top: `${position.y / 16}rem` }}
    />
  );
};

const Marquee = ({ text, speed = 30, reverse = false, className = "" }: { text: string, speed?: number, reverse?: boolean, className?: string }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap brutal-border-y py-2 ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: reverse ? [0, 1000] : [0, -1000] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-[1.5rem] font-display uppercase px-[1em]">{text}</span>
        <span className="text-[1.5rem] font-display uppercase px-[1em]">{text}</span>
        <span className="text-[1.5rem] font-display uppercase px-[1em]">{text}</span>
        <span className="text-[1.5rem] font-display uppercase px-[1em]">{text}</span>
      </motion.div>
    </div>
  );
};

const Navbar = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black border-b-[0.1875rem] border-pink px-[1.5em] py-[1em] flex justify-between items-center">
      <div 
        className="text-[2.1rem] font-display cursor-pointer flex items-center" 
        onClick={() => { setPage('home'); window.scrollTo(0, 0); }}
      >
        <span className="text-pink">GENZVERSE</span>
      </div>

      <div className="hidden md:flex gap-[2.5rem]">
        {['HOME', 'WORK', 'ZINE', 'STUDENTS', 'BRANDS', 'CONTACT'].map((item) => (
          <button
            key={item}
            onClick={() => {
              const pageName = item.toLowerCase() as Page;
              setPage(pageName);
              window.scrollTo(0, 0);
            }}
            className={`font-display text-[1.4rem] relative group transition-colors ${
              (item === 'STUDENTS' || item === 'BRANDS') ? 'text-lime hover:text-pink' : 'text-cream hover:text-pink'
            }`}
          >
            {item}
            <span className="absolute -bottom-[0.25rem] left-0 w-0 h-[0.25rem] bg-lime transition-all group-hover:w-full" />
          </button>
        ))}
      </div>
      


      <button className="md:hidden text-pink z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`w-[2rem] h-[0.25rem] bg-current mb-[0.25rem] transition-all ${isMenuOpen ? 'rotate-45 translate-y-[0.5rem]' : ''}`} />
        <div className={`w-[2rem] h-[0.25rem] bg-current mb-[0.25rem] transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
        <div className={`w-[2rem] h-[0.25rem] bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-[0.5rem]' : ''}`} />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8"
          >
            {['HOME', 'WORK', 'ZINE', 'STUDENTS', 'BRANDS', 'CONTACT'].map((item) => (
              <button
                key={item}
                className="text-[2.25rem] font-display text-cream hover:text-pink transition-colors"
                onClick={() => {
                  const pageName = item.toLowerCase() as Page;
                  setPage(pageName);
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const HomePage = ({ setPage, setSelectedPost }: { setPage: (p: Page) => void, setSelectedPost: (p: BlogPost) => void }) => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-screen bg-black flex flex-col md:flex-row items-center justify-center md:justify-between px-[1.5em] md:px-[5em] relative overflow-hidden text-center md:text-left">
        {/* Dynamic Hero Background */}
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
          <h1 className="text-[2.55rem] md:text-[4.25rem] leading-[0.9] mb-[1.5rem] p-[0.5rem]">
            WE DON'T <br />
            SELL ADS. <br />
            <span className="text-pink glitch-text">WE BUILD MOVEMENTS.</span>
          </h1>
          <p className="text-cream/70 text-[0.85rem] md:text-[0.95rem] mb-[2.5rem] max-w-[32rem]">
            // Scaling Potential
          </p>
          <div className="flex flex-col sm:flex-row gap-[1rem]">
            <button 
              onClick={() => { setPage('zine'); window.scrollTo(0, 0); }}
              className="px-[2rem] py-[0.75rem] border-[0.1875rem] border-cream text-cream font-zine text-[1.25rem] hover:bg-cream hover:text-black transition-colors"
            >
              SEE OUR WORK ↓
            </button>
          </div>
        </div>

        <div className="hidden md:flex md:w-2/5 justify-center items-center mt-[3rem] md:mt-0">
          <div className="relative z-10 text-center">
            {/* Dynamic Two-Tone Logo Background */}
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
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-pink drop-shadow-[0.625rem_0.625rem_0_rgba(143,204,0,0.3)]">GV</span>';
                }}
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
          <h2 className="text-[2.5rem] md:text-[4.5rem] mb-[0.5rem] italic relative z-10 whitespace-nowrap">THE RECEIPTS.</h2>
          <div className="w-[6rem] h-[0.375rem] bg-pink relative z-10" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1.5rem] relative z-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0, rotate: i % 2 === 0 ? -5 : 5 }}
              whileInView={{ scale: 1, opacity: 1, rotate: i % 2 === 0 ? -2 : 2 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              className={`brutal-card p-[1.5em] relative group hover:rotate-0 transition-transform ${stat.color}`}
            >
              <div className="text-[2.5rem] md:text-[3.5rem] font-display text-black mb-[0.25rem] drop-shadow-[0.125rem_0.125rem_0_white] leading-none">{stat.value}</div>
              <div className="text-[0.875rem] font-zine leading-tight text-black uppercase">{stat.label}</div>
              <div className="absolute -top-[0.75rem] -right-[0.75rem] bg-black text-white px-[0.5rem] py-[0.125rem] text-[0.625rem] font-accent rotate-6 brutal-border shadow-[0.125rem_0.125rem_0_#8FCC00]">
                {stat.note}
              </div>
            </motion.div>
          ))}
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
            className="text-[2.5rem] md:text-[4.5rem] font-display relative z-10 whitespace-nowrap"
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
              {/* Background Number */}
              <div className="absolute top-[1.5rem] right-[1.5rem] text-[6rem] font-display text-white/5 leading-none select-none pointer-events-none">
                0{i+1}
              </div>

              {/* Tag */}
              <div className={`inline-block border px-[0.5rem] py-[0.125rem] mb-[2rem] text-[0.625rem] font-bold font-sans w-fit relative z-10 ${
                service.color === 'lime' ? 'border-lime text-lime' : 
                service.color === 'pink' ? 'border-pink text-pink' : 
                'border-cream text-cream'
              }`}>
                [{service.tag}]
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-[2rem] text-lime group-hover:scale-110 transition-transform duration-300">
                <service.icon size="2.5rem" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-[1.75rem] mb-[1rem] font-display uppercase tracking-tight leading-none relative z-10 group-hover:text-white transition-colors">
                {service.title}
              </h3>

              {/* Body */}
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
          <Marquee text={BRANDS.join(" • ")} speed={40} className="bg-white border-y-[0.1875rem] border-black py-2" />
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

      {/* Cities - Reimagined Turf */}
      <section className="bg-black py-[4em] px-[1.5em] md:px-[5em]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-[3rem] gap-[2rem] text-center md:text-left">
          <div className="w-full flex flex-col items-center md:items-start">
            <h2 className="text-[2.5rem] md:text-[4.5rem] leading-none font-display whitespace-nowrap">OUR TURF.</h2>
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
        
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-cream/30 font-display text-[0.7rem] uppercase tracking-widest">
          <span>Vadodara</span>
          <span>Gwalior</span>
          <span>Indore</span>
          <span>Jaipur</span>
          <span>Lucknow</span>
          <span>Chandigarh</span>
          <span>Bhopal</span>
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-cream text-black py-[4rem] px-[1.5rem] md:px-[5rem] flex flex-col items-center text-center overflow-hidden">
        <motion.div 
          initial={{ rotate: 0 }}
          whileInView={{ rotate: -1 }}
          className="max-w-[40rem]"
        >
          <h2 className="text-[1.5rem] md:text-[2.25rem] mb-[0.5rem]">"THE FUTURE OF BRAND LOYALTY</h2>
          <h2 className="text-[2.25rem] md:text-[3.75rem] mb-[0.5rem]">IS BUILT ON <span className="text-pink">PARTICIPATION</span>,</h2>
          <h2 className="text-[1.8rem] md:text-[2.5rem] line-through">NOT OBSERVATION."</h2>
          
          <div className="mt-[2rem] flex items-center justify-center gap-[0.75rem]">
            <div className="w-[0.1875rem] h-[2rem] bg-pink" />
            <div className="text-left">
              <div className="font-zine text-[0.875rem]">GENZVERSE TEAM</div>
              <div className="font-body text-[0.625rem] opacity-60 uppercase tracking-widest">The GenZverse Collective</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Latest Drops */}
      <section className="bg-black py-[4em] px-[1.5em] md:px-[5em]">
        <div className="flex flex-col items-center text-center mb-[3rem]">
          <h2 className="text-[2.5rem] md:text-[4.5rem] whitespace-nowrap">LATEST DROPS.</h2>
          <p className="text-lime font-body mt-[0.5rem] text-[0.875rem] md:text-[1rem] uppercase tracking-wider">// Fresh case studies from the field.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-[2rem]">
          <div className="md:col-span-8">
            <div 
              className="brutal-card bg-black text-cream h-[30rem] relative group cursor-pointer overflow-hidden border-pink border-[0.25rem]"
              onClick={() => { setSelectedPost(BLOG_POSTS[0]); setPage('post'); window.scrollTo(0, 0); }}
            >
              <img src={BLOG_POSTS[0].heroImage} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-[2rem] left-[2rem] right-[2rem]">
                <div className="bg-pink text-white px-[0.75rem] py-[0.125rem] inline-block text-[0.75rem] font-zine mb-[1rem] brutal-border shadow-[0.1875rem_0.1875rem_0_black]">[{BLOG_POSTS[0].category}]</div>
                <h3 className="text-[1.5rem] md:text-[2rem] group-hover:text-pink transition-colors leading-tight">{BLOG_POSTS[0].title}</h3>
                <p className="mt-[1rem] text-cream/80 font-body text-[0.8rem] max-w-[35rem] line-clamp-2">{BLOG_POSTS[0].excerpt}</p>
                <div className="mt-[1.5rem] flex items-center gap-[0.75rem]">
                  <div className="w-[2rem] h-[0.1875rem] bg-lime" />
                  <span className="font-zine text-[0.75rem] text-lime">READ CASE STUDY</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-[2rem]">
            {BLOG_POSTS.slice(1, 3).map((post, i) => (
              <div 
                key={i} 
                className={`brutal-card p-[1.5em] h-[14rem] flex flex-col justify-between cursor-pointer group transition-all hover:bg-pink/10 ${i === 0 ? '-rotate-1' : 'rotate-1'}`}
                onClick={() => { setSelectedPost(post); setPage('post'); window.scrollTo(0, 0); }}
              >
                <div>
                  <div className="bg-lime text-black px-[0.5rem] py-[0.125rem] inline-block text-[0.625rem] font-zine mb-[0.75rem] brutal-border">[{post.category}]</div>
                  <h3 className="text-[1.1rem] leading-tight group-hover:text-pink transition-colors">{post.title}</h3>
                </div>
                <div className="flex justify-between items-center mt-[0.75rem]">
                  <div className="text-[0.625rem] font-bold opacity-50">{post.date}</div>
                  <div className="text-pink font-zine group-hover:translate-x-[0.25rem] transition-transform text-[0.875rem]">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[4rem] flex justify-center">
          <button 
            onClick={() => { setPage('zine'); window.scrollTo(0, 0); }}
            className="bg-lime text-black px-[2rem] py-[0.75rem] font-zine brutal-border brutal-shadow hover:-translate-y-[0.25rem] transition-transform text-[1rem]"
          >
            EXPLORE THE ZINE →
          </button>
        </div>
      </section>
    </div>
  );
};

const ZinePage = ({ setPage, setSelectedPost }: { setPage: (p: Page) => void, setSelectedPost: (p: BlogPost) => void }) => {
  return (
    <div className="bg-black min-h-screen">
      <header className="py-[8rem] px-[1.5em] md:px-[5em] border-b-[0.3125rem] border-pink">
        <h1 className="text-[4.8rem] md:text-[7.2rem] leading-none text-cream whitespace-nowrap">THE ZINE</h1>
        <p className="text-lime text-[1rem] mt-[1rem]">// culture. campaigns. campus. chaos.</p>
        
        <div className="mt-[3rem] flex flex-wrap gap-[1rem]">
          {['LATEST DROPS', 'CAMPAIGN STORIES', 'CULTURE HITS', 'BRAND BREAKDOWNS'].map((tag, i) => (
            <button key={i} className="bg-lime text-black px-[1rem] py-[0.5rem] font-zine brutal-border brutal-shadow hover:bg-black hover:text-lime transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </header>

      <main className="p-[1.5em] md:p-[5em] grid grid-cols-1 md:grid-cols-3 gap-[2.5rem]">
        {BLOG_POSTS.map((post, i) => {
          const isBig = i === 0;
          const colors = ['bg-pink', 'bg-lime', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-orange-500'];
          const cardColor = colors[i % colors.length];
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`brutal-card group cursor-pointer overflow-hidden flex flex-col border-black border-[0.25rem] ${cardColor} ${isBig ? 'md:col-span-2 md:row-span-2' : ''}`}
              onClick={() => { setSelectedPost(post); setPage('post'); window.scrollTo(0, 0); }}
            >
              <div className={`${isBig ? 'h-[25rem]' : 'h-[15.625rem]'} overflow-hidden relative border-b-[0.25rem] border-black`}>
                <img src={post.heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
                <div className="absolute top-[1rem] left-[1rem] bg-black text-white px-[0.75rem] py-[0.25rem] text-[0.75rem] font-bold brutal-border">
                  [{post.category}]
                </div>
              </div>
              <div className="p-[2em] flex-1 flex flex-col justify-between text-black">
                <div>
                  <h2 className={`${isBig ? 'text-[2rem]' : 'text-[1.25rem]'} mb-[1rem] group-hover:translate-x-[0.5rem] transition-transform font-display uppercase leading-tight`}>{post.title}</h2>
                  <p className="text-black/80 font-body text-[0.75rem] line-clamp-3 font-medium">{post.excerpt}</p>
                </div>
                <div className="mt-[1.5rem] flex justify-between items-center text-[0.7rem] font-bold border-t-[0.125rem] border-black/20 pt-[1rem]">
                  <span>BY {post.author.toUpperCase()}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Decorative elements */}
        <div className="md:col-span-3 py-[5rem] flex justify-center">
          <div className="text-[3rem] md:text-[5rem] font-display text-pink -rotate-2 border-y-[0.3125rem] border-pink py-[1rem] w-full text-center">
            "NO CAP. JUST IMPACT."
          </div>
        </div>
      </main>

      <div className="px-[5em] pb-[5rem]">
        <button className="w-full py-[2.5rem] bg-cream text-black text-[3rem] font-display brutal-border brutal-shadow hover:bg-lime transition-colors">
          LOAD MORE ↓
        </button>
      </div>
    </div>
  );
};

const PostPage = ({ post, setPage }: { post: BlogPost, setPage: (p: Page) => void }) => {
  return (
    <div className="bg-black min-h-screen">
      <div className="h-[70vh] relative overflow-hidden">
        <img src={post.heroImage} className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-[2.5rem] left-[2.5rem] bg-lime text-black px-[1rem] py-[0.5rem] font-zine brutal-border">
          [{post.category}]
        </div>
        <div className="absolute bottom-[2.5rem] left-[2.5rem] right-[2.5rem]">
          <h1 className="text-[2.7rem] md:text-[4.8rem] leading-none max-w-[60rem]">{post.title}</h1>
          <div className="mt-[2rem] flex justify-between items-end border-t border-cream/20 pt-[1rem]">
            <div className="font-body text-cream/60">BY {post.author} // {post.date}</div>
            <div className="text-[4.8rem] font-display opacity-5 absolute -bottom-[2.5rem] right-0">{post.category}</div>
          </div>
        </div>
      </div>

      <article className="max-w-[60rem] mx-auto py-[5rem] px-[1.5em] font-body text-cream/90 leading-relaxed">
        <div className="text-[1.5rem] mb-[3rem] first-letter:text-[5rem] first-letter:font-display first-letter:text-pink first-letter:float-left first-letter:mr-[1rem] first-letter:mt-[0.5rem]">
          {post.excerpt}
        </div>
        
        <div 
          className="prose prose-invert prose-xl max-w-none 
            prose-headings:font-display prose-headings:uppercase prose-headings:text-pink
            prose-h2:text-[3.75rem] prose-h2:border-b-[0.125rem] prose-h2:border-lime prose-h2:pb-[0.5rem]
            prose-h3:text-[2.25rem]
            prose-blockquote:font-display prose-blockquote:text-[3rem] prose-blockquote:text-cream prose-blockquote:border-none prose-blockquote:rotate-[-1deg] prose-blockquote:my-[5rem] prose-blockquote:text-center
            prose-li:list-disc prose-li:marker:text-lime"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <div className="mt-[5rem] flex flex-wrap gap-[1rem]">
          {post.tags.map(tag => (
            <span key={tag} className="bg-cream text-black px-[0.75rem] py-[0.25rem] text-[0.75rem] font-bold brutal-border">#{tag}</span>
          ))}
        </div>
      </article>

      <div className="border-y-[0.3125rem] border-pink py-[3rem] flex justify-center bg-cream">
        <button 
          className="text-[3.75rem] font-display text-black hover:text-pink transition-colors"
          onClick={() => { setPage('zine'); window.scrollTo(0, 0); }}
        >
          ← BACK TO THE ZINE
        </button>
      </div>
    </div>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-cream text-black pt-[5rem] overflow-hidden border-t-[0.3125rem] border-black relative">
      <div className="absolute inset-0 bg-pattern-dots opacity-5 pointer-events-none" />
      <div className="px-[1.5rem] md:px-[5rem] grid grid-cols-1 md:grid-cols-3 gap-[3rem] mb-[5rem] relative z-10">
        <div>
          <div className="text-[2.5rem] font-display mb-[1rem] flex items-center">
            <span className="text-pink">GENZVERSE</span>
          </div>
          <p className="text-[0.875rem] font-bold max-w-[20rem]">
            Student-First Marketing Ecosystem. <br />
            Youth-led Campaign Force.
          </p>
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <h4 className="font-zine text-[1.25rem] mb-[0.5rem]">NAVIGATE</h4>
          {[
            { label: 'HOME', value: 'home' },
            { label: 'WORK', value: 'work' },
            { label: 'ZINE', value: 'zine' },
            { label: 'CONTACT', value: 'contact' }
          ].map(item => (
            <button 
              key={item.label} 
              onClick={() => { setPage(item.value as Page); window.scrollTo(0, 0); }}
              className="text-left font-display text-[1.5rem] hover:text-pink transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div>
          <h4 className="font-zine text-[1.25rem] mb-[0.5rem]">CONTACT</h4>
          <p className="font-body text-[0.875rem]">
            93161-06151 <br />
            <a href="mailto:info@genzverse.space" className="hover:text-pink underline">info@genzverse.space</a>
          </p>
          <div className="flex gap-[1rem] mt-[1.5rem]">
            <a href="https://www.instagram.com/genzverse.io/" target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] brutal-border bg-pink text-white flex items-center justify-center font-zine rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Instagram size="1.25rem" />
            </a>
            <a href="https://wa.me/9316106151" target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] brutal-border bg-lime text-black flex items-center justify-center font-zine -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <MessageCircle size="1.25rem" />
            </a>
            <a href="https://in.linkedin.com/company/genzverse" target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] brutal-border bg-blue-600 text-white flex items-center justify-center font-zine rotate-6 hover:rotate-0 transition-transform cursor-pointer">
              <Linkedin size="1.25rem" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative">
        <h1 className="text-[20vw] leading-none font-display text-pink opacity-100 translate-y-1/4 select-none">GENZVERSE</h1>
      </div>

      <div className="bg-lime border-t-[0.1875rem] border-black py-[0.5rem] overflow-hidden">
        <Marquee text="© GENZVERSE 2024–2026 • MADE BY GEN Z FOR GEN Z • INDIA • " speed={20} />
      </div>
    </footer>
  );
};

const WorkPage = () => {
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
      <h1 className="text-[3.5rem] md:text-[6.5rem] leading-none mb-[3rem] whitespace-nowrap">THE WORK.</h1>
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
        <h2 className="text-[3.75rem] md:text-[5rem] mb-[3rem] uppercase">Event Marketing</h2>
        <div className="space-y-[2rem] mb-[5rem]">
          {[
            "QS Study Abroad Fair – 500+ student visits across 6 cities",
            "WPL Speed Queen – Regional event marketing with 200+ participants"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-[1.5rem] group cursor-default">
              <div className="w-[1rem] h-[1rem] bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-[1.5rem] md:text-[1.875rem] font-body group-hover:translate-x-[0.5rem] transition-transform">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-[3.75rem] md:text-[5rem] mb-[3rem] uppercase">Gaming Events</h2>
        <div className="space-y-[2rem] mb-[5rem]">
          {[
            "Dell Gaming – Event marketing & influencer management across 9 cities",
            "ASUS & HP Gaming – Multi-city event marketing and management"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-[1.5rem] group cursor-default">
              <div className="w-[1rem] h-[1rem] bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-[1.5rem] md:text-[1.875rem] font-body group-hover:translate-x-[0.5rem] transition-transform">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-[3.75rem] md:text-[5rem] mb-[3rem] uppercase">Influencer Marketing</h2>
        <div className="space-y-[2rem] mb-[5rem]">
          {[
            "SHEIN – Influencer engagement at IIT Bombay (Mood Indigo)"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-[1.5rem] group cursor-default">
              <div className="w-[1rem] h-[1rem] bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-[1.5rem] md:text-[1.875rem] font-body group-hover:translate-x-[0.5rem] transition-transform">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-[3.75rem] md:text-[5rem] mb-[3rem] uppercase">Campus Activation</h2>
        <div className="space-y-[2rem]">
          {[
            "Gujarat Titans (IPL) – College-level marketing initiative"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-[1.5rem] group cursor-default">
              <div className="w-[1rem] h-[1rem] bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-[1.5rem] md:text-[1.875rem] font-body group-hover:translate-x-[0.5rem] transition-transform">{exp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="bg-pink min-h-screen py-[6rem] px-[1.5em] md:px-[5em] flex flex-col md:flex-row gap-[5rem]">
      <div className="w-full md:w-1/2">
        <h1 className="text-[6.25rem] md:text-[9.375rem] leading-none text-black mb-[3rem]">LET'S <br />TALK.</h1>
        <p className="text-black text-[1.5rem] font-body mb-[3rem] max-w-[30rem]">
          Ready to build a movement? Whether you're a brand looking for Gen Z penetration or a student leader wanting to join the force, we're live.
        </p>
        
        <div className="space-y-[2rem]">
          <a href="https://wa.me/9316106151" target="_blank" rel="noopener noreferrer" className="block brutal-card p-[2em] bg-black text-cream hover:bg-lime hover:text-black transition-colors">
            <div className="text-[0.875rem] font-zine mb-[0.5rem] opacity-60">WHATSAPP US</div>
            <div className="text-[2.5rem] font-display">93161-06151</div>
          </a>
          <a href="mailto:info@genzverse.space" className="block brutal-card p-[2em] bg-cream text-black hover:bg-lime transition-colors">
            <div className="text-[0.875rem] font-zine mb-[0.5rem] opacity-60">EMAIL US</div>
            <div className="text-[2.5rem] font-display">info@genzverse.space</div>
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="brutal-card p-[3em] bg-black text-cream relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[8rem] h-[8rem] bg-lime opacity-20 -translate-y-1/2 translate-x-1/2 rotate-45" />
          <h2 className="text-[3rem] mb-[2rem]">OUR SOCIALS</h2>
          <div className="grid grid-cols-1 gap-[1.5rem]">
            <a href="https://www.instagram.com/genzverse.io/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-pink transition-colors">INSTAGRAM</span>
              <span className="text-[1.5rem] font-zine text-pink">→</span>
            </a>
            <a href="https://in.linkedin.com/company/genzverse" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-lime transition-colors">LINKEDIN</span>
              <span className="text-[1.5rem] font-zine text-lime">→</span>
            </a>
            <a href="https://chat.whatsapp.com/IuFnL5VEjfS08csklpEXja?mode=ems_copy_t" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-blue-400 transition-colors">COMMUNITY</span>
              <span className="text-[1.5rem] font-zine text-blue-400">→</span>
            </a>
          </div>
          
          <div className="mt-[4rem] pt-[2rem] border-t border-cream/20">
            <div className="text-[0.875rem] font-body opacity-60 uppercase tracking-widest">Headquarters</div>
            <div className="text-[1.25rem] font-zine mt-[0.5rem]">Ahmedabad // Mumbai // Delhi // India</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomePage setPage={setPage} setSelectedPost={setSelectedPost} />
            </motion.div>
          )}
          {page === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WorkPage />
            </motion.div>
          )}
          {page === 'zine' && (
            <motion.div
              key="zine"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ZinePage setPage={setPage} setSelectedPost={setSelectedPost} />
            </motion.div>
          )}
          {page === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContactPage />
            </motion.div>
          )}
          {page === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black min-h-screen flex items-center justify-center"
            >
              <h1 className="text-[3.75rem] font-display text-lime">FOR STUDENTS PAGE COMING SOON.</h1>
            </motion.div>
          )}
          {page === 'brands' && (
            <motion.div
              key="brands"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black min-h-screen flex items-center justify-center"
            >
              <h1 className="text-[3.75rem] font-display text-pink">FOR BRANDS PAGE COMING SOON.</h1>
            </motion.div>
          )}
          {page === 'post' && selectedPost && (
            <motion.div
              key="post"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PostPage post={selectedPost} setPage={setPage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
