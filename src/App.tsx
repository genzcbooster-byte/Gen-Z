/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BLOG_POSTS, CITIES, STATS, BRANDS } from './constants';
import { BlogPost, Page, Service } from './types';
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
  ArrowLeft,
  CheckCircle2
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
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
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
        <span className="text-2xl font-display uppercase px-4">{text}</span>
        <span className="text-2xl font-display uppercase px-4">{text}</span>
        <span className="text-2xl font-display uppercase px-4">{text}</span>
        <span className="text-2xl font-display uppercase px-4">{text}</span>
      </motion.div>
    </div>
  );
};

const Navbar = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black border-b-3 border-pink px-6 py-4 flex justify-between items-center">
      <div 
        className="text-3xl font-display cursor-pointer flex items-center" 
        onClick={() => { setPage('home'); window.scrollTo(0, 0); }}
      >
        <span className="text-pink">GENZVERSE</span>
      </div>

      <div className="hidden md:flex gap-8">
        {['HOME', 'WORK', 'ZINE', 'STUDENTS', 'BRANDS', 'CONTACT'].map((item) => (
          <button
            key={item}
            onClick={() => {
              const pageName = item.toLowerCase() as Page;
              setPage(pageName);
              window.scrollTo(0, 0);
            }}
            className={`font-display text-xl relative group transition-colors ${
              (item === 'STUDENTS' || item === 'BRANDS') ? 'text-lime hover:text-pink' : 'text-cream hover:text-pink'
            }`}
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-lime transition-all group-hover:w-full" />
          </button>
        ))}
      </div>
      


      <button className="md:hidden text-pink z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`w-8 h-1 bg-current mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`w-8 h-1 bg-current mb-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
        <div className={`w-8 h-1 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
                className="text-4xl font-display text-cream hover:text-pink transition-colors"
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

const HomePage = ({ setPage, setSelectedPost, setSelectedService }: { setPage: (p: Page) => void, setSelectedPost: (p: BlogPost) => void, setSelectedService: (s: Service) => void }) => {
  const services: Service[] = [
    { 
      title: "COMMUNITY & CAMPUS", 
      body: "The ecosystem backbone. Connecting brands with students through peer-driven engagement inside college ecosystems.", 
      icon: Users, 
      tag: "ECOSYSTEM", 
      color: "lime",
      fullDescription: "Our campus network is the largest in India, spanning over 500+ colleges. We don't just put up posters; we build genuine communities that advocate for your brand.",
      features: ["Campus Ambassador Programs", "Direct Student Outreach", "Micro-Community Building", "Peer-to-Peer Marketing"]
    },
    { 
      title: "EVENTS & EXPERIENCES", 
      body: "Live, on-ground youth engagements designed for high recall and physical brand interaction.", 
      icon: Trophy, 
      tag: "LIVE", 
      color: "pink",
      fullDescription: "From massive campus takeovers to niche experiential pop-ups, we create moments that students actually want to be a part of.",
      features: ["Campus Takeovers", "Experiential Booths", "Product Sampling", "Live Competitions"]
    },
    { 
      title: "CONTENT & MEDIA", 
      body: "Campaign amplification layer ensuring authentic youth storytelling and bulk promotion.", 
      icon: Megaphone, 
      tag: "AMPLIFY", 
      color: "lime",
      fullDescription: "We speak the language of Gen Z. Our content strategies are designed to go viral within student circles, ensuring your message isn't just seen, but shared.",
      features: ["Viral Content Creation", "Student Media Networks", "Meme Marketing", "Bulk Digital Promotion"]
    },
    { 
      title: "BRAND SOLUTIONS", 
      body: "The commercial engine. Solving brand objectives through outcome-driven youth campaigns.", 
      icon: Rocket, 
      tag: "GROWTH", 
      color: "pink",
      fullDescription: "We bridge the gap between corporate goals and youth culture. Our bespoke solutions are designed to deliver measurable ROI and long-term brand equity.",
      features: ["GTM Strategy for Gen Z", "Product Market Fit Analysis", "Conversion-Focused Campaigns", "Brand Positioning"]
    },
    { 
      title: "TALENT & CREATORS", 
      body: "Relevant youth voices for campaigns and live engagements. Campaign-specific creator activation.", 
      icon: Sparkles, 
      tag: "PEOPLE", 
      color: "lime",
      fullDescription: "We manage a curated roster of campus icons and micro-influencers who have real influence over their peers' purchasing decisions.",
      features: ["Micro-Influencer Management", "Campus Icon Activation", "Creator Collaboration", "Talent Scouting"]
    },
    { 
      title: "TSF – THE SAMVIDHAN FORUM", 
      body: "Purpose-led vertical focused on youth awareness, dialogue, and institutional engagement.", 
      icon: Globe, 
      tag: "PURPOSE", 
      color: "cream",
      fullDescription: "A unique initiative focused on civic engagement and social awareness among the youth. We facilitate meaningful dialogues and institutional partnerships.",
      features: ["Civic Awareness Workshops", "Youth Dialogue Forums", "Institutional Partnerships", "Social Impact Campaigns"]
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-screen bg-black flex flex-col md:flex-row items-center px-6 md:px-20 relative overflow-hidden">
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
            className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-pink/10 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-lime/10 blur-[100px] rounded-full"
          />
          <div className="absolute inset-0 bg-pattern-dots text-lime/10 opacity-30" />
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-lime/20 shadow-[0_0_15px_rgba(143,204,0,0.5)] z-0"
          />
        </div>

        <div className="w-full md:w-3/5 z-10 pt-20 md:pt-0 pb-12">
          <div className="inline-block bg-lime text-black px-3 py-1 brutal-border brutal-shadow mb-6 text-xs font-bold">
            EST. MAY 2024 // YOUTH-LED CAMPAIGN FORCE.
          </div>
          <h1 className="text-7xl md:text-9xl leading-[0.9] mb-6 p-2">
            WE DON'T <br />
            SELL ADS. <br />
            <span className="text-pink glitch-text">WE BUILD MOVEMENTS.</span>
          </h1>
          <p className="text-cream/70 text-lg md:text-xl mb-10 max-w-lg">
            // Scaling Potential
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://chat.whatsapp.com/IuFnL5VEjfS08csklpEXja?mode=ems_copy_t" 
              target="_blank" 
              rel="noopener noreferrer"
              className="brutal-btn-pink text-xl"
            >
              JOIN OUR COMMUNITY →
            </a>
            <button 
              onClick={() => { setPage('zine'); window.scrollTo(0, 0); }}
              className="px-8 py-3 border-3 border-cream text-cream font-zine text-xl hover:bg-cream hover:text-black transition-colors"
            >
              SEE OUR WORK ↓
            </button>
          </div>
        </div>

        <div className="w-full md:w-2/5 relative flex justify-center items-center mt-12 md:mt-0">
          <div className="relative z-10 text-center">
            {/* Dynamic Two-Tone Logo Background */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center opacity-20"
            >
              <div className="w-[500px] h-[500px] border-dashed border-4 border-lime rounded-full" />
              <div className="absolute w-[400px] h-[400px] border-dashed border-2 border-pink rounded-full" />
            </motion.div>

            <div className="text-[12rem] md:text-[18rem] font-display leading-none select-none flex">
              <span className="text-pink drop-shadow-[10px_10px_0_rgba(143,204,0,0.3)]">G</span>
              <span className="text-pink drop-shadow-[10px_10px_0_rgba(143,204,0,0.3)]">V</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:flex text-black text-6xl md:text-8xl font-display brutal-border bg-lime p-6 rotate-[-5deg] shadow-brutal-pink"
              >
                REAL TALK.
              </motion.div>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-64 h-64 md:w-96 md:h-96 border-4 border-lime/40 rounded-full"
          />
          
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[Zap, Target, Heart, Flame].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute text-lime"
                style={{ 
                  top: `${20 + i * 20}%`, 
                  left: `${10 + i * 25}%`,
                  '--rot': `${(i % 2 === 0 ? 1 : -1) * 5}deg` 
                } as any}
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon size={48} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-lime text-black">
          <Marquee text="GENZVERSE • INDIA'S #1 STUDENT MARKETING ECOSYSTEM • SINCE MAY 2024 • CAMPUS TO CAMPAIGN • VERIFIED RESULTS • " />
        </div>
      </section>

      {/* Stats Slam */}
      <section className="bg-cream text-black py-24 px-6 md:px-20 brutal-border-y-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <h2 className="text-8xl md:text-9xl mb-2 italic relative z-10">THE RECEIPTS.</h2>
        <div className="w-40 h-2 bg-pink mb-16 relative z-10" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0, rotate: i % 2 === 0 ? -5 : 5 }}
              whileInView={{ scale: 1, opacity: 1, rotate: i % 2 === 0 ? -2 : 2 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              className={`brutal-card p-8 relative group hover:rotate-0 transition-transform ${stat.color}`}
            >
              <div className="text-7xl font-display text-black mb-2 drop-shadow-[4px_4px_0_white]">{stat.value}</div>
              <div className="text-lg font-zine leading-tight text-black uppercase">{stat.label}</div>
              <div className="absolute -top-4 -right-4 bg-black text-white px-3 py-1 text-xs font-accent rotate-6 brutal-border shadow-[4px_4px_0_#8FCC00]">
                {stat.note}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-black py-24 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid text-white/5 opacity-10 pointer-events-none" />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-7xl md:text-9xl mb-20 font-display relative z-10"
        >
          WHAT WE <span className="text-pink">ACTUALLY</span> DO.
        </motion.h2>

        <div className="flex flex-wrap border-cream/10 border relative z-10">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setSelectedService(service); setPage('service'); window.scrollTo(0, 0); }}
              className="w-full md:w-1/3 p-12 border border-cream/10 relative overflow-hidden group hover:bg-white/5 transition-colors flex flex-col min-h-[400px] cursor-pointer"
            >
              {/* Background Number */}
              <div className="absolute top-8 right-8 text-[12rem] font-display text-white/5 leading-none select-none pointer-events-none">
                0{i+1}
              </div>

              {/* Tag */}
              <div className={`inline-block border px-2 py-0.5 mb-10 text-[10px] font-bold font-sans w-fit relative z-10 ${
                service.color === 'lime' ? 'border-lime text-lime' : 
                service.color === 'pink' ? 'border-pink text-pink' : 
                'border-cream text-cream'
              }`}>
                [{service.tag}]
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-10 text-lime group-hover:scale-110 transition-transform duration-300">
                <service.icon size={48} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-4xl mb-6 font-display uppercase tracking-tight leading-none relative z-10 group-hover:text-white transition-colors">
                {service.title}
              </h3>

              {/* Body */}
              <p className="text-cream/50 text-sm font-sans leading-relaxed max-w-xs relative z-10">
                {service.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Wall */}
      <section className="bg-cream text-black py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-blueprint opacity-10 pointer-events-none" />
        <h2 className="text-7xl px-6 md:px-20 mb-12 relative z-10">BRANDS WE'VE MOVED.</h2>
        <div className="relative z-10">
          <Marquee text={BRANDS.join(" • ")} speed={40} className="bg-white border-y-4 border-black" />
          <Marquee text={BRANDS.reverse().join(" • ")} speed={50} reverse className="bg-white mt-4 border-y-4 border-black" />
        </div>

        <div className="mt-20 px-6 md:px-20 relative z-10">
          <div className="bg-pink brutal-border p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-brutal-lg">
            <div className="absolute inset-0 opacity-20 bg-pattern-diagonal text-black" />
            <div className="z-10 text-center md:text-left">
              <h3 className="text-6xl md:text-8xl drop-shadow-[4px_4px_0_white]">YOUR BRAND NEXT?</h3>
              <p className="text-black font-bold text-xl mt-2 bg-lime inline-block px-4 py-1 brutal-border">Let's build a movement.</p>
            </div>
            <a 
              href="https://wa.me/9316106151" 
              target="_blank" 
              rel="noopener noreferrer"
              className="z-10 bg-black text-cream px-10 py-5 brutal-border-cream brutal-shadow-pink font-zine text-2xl hover:-translate-y-1 transition-transform"
            >
              → CONTACT US
            </a>
          </div>
        </div>
      </section>

      {/* Cities - Reimagined Turf */}
      <section className="bg-black py-24 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-8xl md:text-[10rem] leading-none font-display">OUR TURF.</h2>
            <p className="text-lime font-body mt-4">// Tier-1 and Tier-2 penetration. 15+ cities and counting.</p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-pink font-display text-4xl">PAN-INDIA</div>
            <div className="text-cream/50 text-sm font-body">STUDENT NETWORK</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CITIES.map((city, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="brutal-card bg-zinc-900 border-cream/20 p-6 group hover:bg-pink hover:border-black transition-all cursor-default"
            >
              <div className="text-xs font-display text-lime group-hover:text-black mb-2">0{i+1}</div>
              <h3 className="text-3xl font-display text-cream group-hover:text-black transition-colors">{city.name}</h3>
              <div className="mt-4 pt-4 border-t border-cream/10 group-hover:border-black/20">
                <span className="text-[10px] font-display text-cream/40 group-hover:text-black/60 uppercase">Status:</span>
                <div className="text-xs font-bold text-lime group-hover:text-black uppercase mt-1">{city.stat}</div>
              </div>
            </motion.div>
          ))}
          <div className="brutal-card bg-lime border-black p-6 flex items-center justify-center text-center group hover:bg-white transition-colors">
            <div className="font-display text-black text-2xl">AND <br />MANY <br />MORE.</div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-cream/30 font-display text-sm uppercase tracking-widest">
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
      <section className="bg-cream text-black py-32 px-6 md:px-20 flex flex-col items-center text-center overflow-hidden">
        <motion.div 
          initial={{ rotate: 0 }}
          whileInView={{ rotate: -1 }}
          className="max-w-5xl"
        >
          <h2 className="text-5xl md:text-7xl mb-4">"THE FUTURE OF BRAND LOYALTY</h2>
          <h2 className="text-7xl md:text-9xl mb-4">IS BUILT ON <span className="text-pink">PARTICIPATION</span>,</h2>
          <h2 className="text-6xl md:text-8xl line-through">NOT OBSERVATION."</h2>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-1 h-12 bg-pink" />
            <div className="text-left">
              <div className="font-zine text-xl">ANGEL DAGLIYA</div>
              <div className="text-sm opacity-60">FOUNDER OF GENZVERSE</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Latest Drops */}
      <section className="bg-black py-24 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="text-8xl md:text-9xl">LATEST DROPS.</h2>
            <p className="text-lime font-body mt-2">// Fresh case studies from the field.</p>
          </div>
          <button 
            onClick={() => { setPage('zine'); window.scrollTo(0, 0); }}
            className="bg-lime text-black px-6 py-3 font-zine brutal-border brutal-shadow hover:-translate-y-1 transition-transform"
          >
            EXPLORE THE ZINE →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <div 
              className="brutal-card bg-black text-cream h-[600px] relative group cursor-pointer overflow-hidden border-pink border-4"
              onClick={() => { setSelectedPost(BLOG_POSTS[0]); setPage('post'); window.scrollTo(0, 0); }}
            >
              <img src={BLOG_POSTS[0].heroImage} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="bg-pink text-white px-4 py-1 inline-block text-sm font-zine mb-6 brutal-border shadow-[4px_4px_0_black]">[{BLOG_POSTS[0].category}]</div>
                <h3 className="text-6xl md:text-7xl group-hover:text-pink transition-colors leading-none">{BLOG_POSTS[0].title}</h3>
                <p className="mt-6 text-cream/80 font-body text-lg max-w-2xl">{BLOG_POSTS[0].excerpt}</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-1 bg-lime" />
                  <span className="font-zine text-lime">READ CASE STUDY</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-10">
            {BLOG_POSTS.slice(1, 3).map((post, i) => (
              <div 
                key={i} 
                className={`brutal-card p-8 h-[275px] flex flex-col justify-between cursor-pointer group transition-all hover:bg-pink/10 ${i === 0 ? '-rotate-1' : 'rotate-1'}`}
                onClick={() => { setSelectedPost(post); setPage('post'); window.scrollTo(0, 0); }}
              >
                <div>
                  <div className="bg-lime text-black px-3 py-1 inline-block text-[10px] font-zine mb-4 brutal-border">[{post.category}]</div>
                  <h3 className="text-4xl leading-tight group-hover:text-pink transition-colors">{post.title}</h3>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-xs font-bold opacity-50">{post.date}</div>
                  <div className="text-pink font-zine group-hover:translate-x-2 transition-transform">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ZinePage = ({ setPage, setSelectedPost }: { setPage: (p: Page) => void, setSelectedPost: (p: BlogPost) => void }) => {
  return (
    <div className="bg-black min-h-screen">
      <header className="py-32 px-6 md:px-20 border-b-5 border-pink">
        <h1 className="text-[140px] md:text-[200px] leading-none text-cream">THE ZINE</h1>
        <p className="text-lime text-xl mt-4">// culture. campaigns. campus. chaos.</p>
        
        <div className="mt-12 flex flex-wrap gap-4">
          {['LATEST DROPS', 'CAMPAIGN STORIES', 'CULTURE HITS', 'BRAND BREAKDOWNS'].map((tag, i) => (
            <button key={i} className="bg-lime text-black px-4 py-2 font-zine brutal-border brutal-shadow hover:bg-black hover:text-lime transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6 md:p-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {BLOG_POSTS.map((post, i) => {
          const isBig = i === 0;
          const colors = ['bg-pink', 'bg-lime', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-orange-500'];
          const cardColor = colors[i % colors.length];
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`brutal-card group cursor-pointer overflow-hidden flex flex-col border-black border-4 ${cardColor} ${isBig ? 'md:col-span-2 md:row-span-2' : ''}`}
              onClick={() => { setSelectedPost(post); setPage('post'); window.scrollTo(0, 0); }}
            >
              <div className={`${isBig ? 'h-[400px]' : 'h-[250px]'} overflow-hidden relative border-b-4 border-black`}>
                <img src={post.heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold brutal-border">
                  [{post.category}]
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between text-black">
                <div>
                  <h2 className={`${isBig ? 'text-6xl' : 'text-4xl'} mb-4 group-hover:translate-x-2 transition-transform font-display uppercase leading-none`}>{post.title}</h2>
                  <p className="text-black/80 font-body text-sm line-clamp-3 font-medium">{post.excerpt}</p>
                </div>
                <div className="mt-6 flex justify-between items-center text-xs font-bold border-t-2 border-black/20 pt-4">
                  <span>BY {post.author.toUpperCase()}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Decorative elements */}
        <div className="md:col-span-3 py-20 flex justify-center">
          <div className="text-8xl font-display text-pink -rotate-2 border-y-5 border-pink py-4 w-full text-center">
            "NO CAP. JUST IMPACT."
          </div>
        </div>
      </main>

      <div className="px-20 pb-20">
        <button className="w-full py-10 bg-cream text-black text-5xl font-display brutal-border brutal-shadow hover:bg-lime transition-colors">
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
        <div className="absolute top-10 left-10 bg-lime text-black px-4 py-2 font-zine brutal-border">
          [{post.category}]
        </div>
        <div className="absolute bottom-10 left-10 right-10">
          <h1 className="text-7xl md:text-9xl leading-none max-w-4xl">{post.title}</h1>
          <div className="mt-8 flex justify-between items-end border-t border-cream/20 pt-4">
            <div className="font-body text-cream/60">BY {post.author} // {post.date}</div>
            <div className="text-9xl font-display opacity-5 absolute -bottom-10 right-0">{post.category}</div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto py-20 px-6 font-body text-cream/90 leading-relaxed">
        <div className="text-2xl mb-12 first-letter:text-8xl first-letter:font-display first-letter:text-pink first-letter:float-left first-letter:mr-4 first-letter:mt-2">
          {post.excerpt}
        </div>
        
        <div 
          className="prose prose-invert prose-xl max-w-none 
            prose-headings:font-display prose-headings:uppercase prose-headings:text-pink
            prose-h2:text-6xl prose-h2:border-b-2 prose-h2:border-lime prose-h2:pb-2
            prose-h3:text-4xl
            prose-blockquote:font-display prose-blockquote:text-5xl prose-blockquote:text-cream prose-blockquote:border-none prose-blockquote:rotate-[-1deg] prose-blockquote:my-20 prose-blockquote:text-center
            prose-li:list-disc prose-li:marker:text-lime"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <div className="mt-20 flex flex-wrap gap-4">
          {post.tags.map(tag => (
            <span key={tag} className="bg-cream text-black px-3 py-1 text-xs font-bold brutal-border">#{tag}</span>
          ))}
        </div>
      </article>

      <div className="border-y-5 border-pink py-12 flex justify-center bg-cream">
        <button 
          className="text-6xl font-display text-black hover:text-pink transition-colors"
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
    <footer className="bg-cream text-black pt-20 overflow-hidden border-t-5 border-black relative">
      <div className="absolute inset-0 bg-pattern-dots opacity-5 pointer-events-none" />
      <div className="px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 relative z-10">
        <div>
          <div className="text-4xl font-display mb-4 flex items-center">
            <span className="text-pink">GENZVERSE</span>
          </div>
          <p className="text-sm font-bold max-w-xs">
            Student-First Marketing Ecosystem. <br />
            Youth-led Campaign Force.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-zine text-xl mb-2">NAVIGATE</h4>
          {[
            { label: 'HOME', value: 'home' },
            { label: 'WORK', value: 'work' },
            { label: 'ZINE', value: 'zine' },
            { label: 'CONTACT', value: 'contact' }
          ].map(item => (
            <button 
              key={item.label} 
              onClick={() => { setPage(item.value as Page); window.scrollTo(0, 0); }}
              className="text-left font-display text-2xl hover:text-pink transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div>
          <h4 className="font-zine text-xl mb-2">CONTACT</h4>
          <p className="font-body text-sm">
            Angel Dagliya <br />
            93161-06151 <br />
            <a href="mailto:angel@genzverse.space" className="hover:text-pink underline">angel@genzverse.space</a>
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://www.instagram.com/genzverse.io/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 brutal-border bg-pink text-white flex items-center justify-center font-zine rotate-3 hover:rotate-0 transition-transform cursor-pointer">IG</a>
            <a href="https://wa.me/9316106151" target="_blank" rel="noopener noreferrer" className="w-10 h-10 brutal-border bg-lime text-black flex items-center justify-center font-zine -rotate-3 hover:rotate-0 transition-transform cursor-pointer">WA</a>
            <a href="https://in.linkedin.com/company/genzverse" target="_blank" rel="noopener noreferrer" className="w-10 h-10 brutal-border bg-blue-600 text-white flex items-center justify-center font-zine rotate-6 hover:rotate-0 transition-transform cursor-pointer">LI</a>
          </div>
        </div>
      </div>

      <div className="relative">
        <h1 className="text-[20vw] leading-none font-display text-pink opacity-100 translate-y-1/4 select-none">GENZVERSE</h1>
      </div>

      <div className="bg-lime border-t-3 border-black py-2 overflow-hidden">
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
    <div className="bg-black min-h-screen py-24 px-6 md:px-20">
      <h1 className="text-[120px] md:text-[180px] leading-none mb-12">THE WORK.</h1>
      <p className="text-lime text-xl mb-20 font-body">// Measurable outcomes. Real communities. Verified results.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {campaignStats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`brutal-card p-10 flex flex-col justify-between h-[300px] ${item.color}`}
          >
            <div className="text-2xl font-zine text-black border-b-2 border-black pb-2 mb-4">{item.brand}</div>
            <div className="text-7xl font-display text-black leading-none">{item.stat}</div>
            <div className="text-xl font-zine text-black/80 mt-2">{item.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 border-t-5 border-pink pt-20">
        <h2 className="text-6xl md:text-8xl mb-12 uppercase">Event Marketing</h2>
        <div className="space-y-8 mb-20">
          {[
            "QS Study Abroad Fair – 500+ student visits across 6 cities",
            "WPL Speed Queen – Regional event marketing with 200+ participants"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-default">
              <div className="w-4 h-4 bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-2xl md:text-3xl font-body group-hover:translate-x-2 transition-transform">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-6xl md:text-8xl mb-12 uppercase">Gaming Events</h2>
        <div className="space-y-8 mb-20">
          {[
            "Dell Gaming – Event marketing & influencer management across 9 cities",
            "ASUS & HP Gaming – Multi-city event marketing and management"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-default">
              <div className="w-4 h-4 bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-2xl md:text-3xl font-body group-hover:translate-x-2 transition-transform">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-6xl md:text-8xl mb-12 uppercase">Influencer Marketing</h2>
        <div className="space-y-8 mb-20">
          {[
            "SHEIN – Influencer engagement at IIT Bombay (Mood Indigo)"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-default">
              <div className="w-4 h-4 bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-2xl md:text-3xl font-body group-hover:translate-x-2 transition-transform">{exp}</div>
            </div>
          ))}
        </div>

        <h2 className="text-6xl md:text-8xl mb-12 uppercase">Campus Activation</h2>
        <div className="space-y-8">
          {[
            "Gujarat Titans (IPL) – College-level marketing initiative"
          ].map((exp, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-default">
              <div className="w-4 h-4 bg-lime brutal-border group-hover:bg-pink transition-colors" />
              <div className="text-2xl md:text-3xl font-body group-hover:translate-x-2 transition-transform">{exp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServicePage = ({ service, setPage }: { service: Service, setPage: (p: Page) => void }) => {
  return (
    <div className="bg-black min-h-screen">
      <div className="relative py-32 px-6 md:px-20 overflow-hidden border-b-5 border-pink">
        <div className="absolute inset-0 bg-pattern-grid text-white/5 opacity-10 pointer-events-none" />
        
        <button 
          onClick={() => { setPage('home'); window.scrollTo(0, 0); }}
          className="flex items-center gap-2 text-lime font-zine mb-12 hover:text-pink transition-colors relative z-10"
        >
          <ArrowLeft size={20} />
          BACK TO HOME
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
          <div className="max-w-4xl">
            <div className={`inline-block border-2 px-4 py-1 mb-8 text-sm font-bold font-sans ${
              service.color === 'lime' ? 'border-lime text-lime' : 
              service.color === 'pink' ? 'border-pink text-pink' : 
              'border-cream text-cream'
            }`}>
              [{service.tag}]
            </div>
            <h1 className="text-7xl md:text-[140px] leading-none mb-8">{service.title}</h1>
            <p className="text-cream/70 text-2xl font-body leading-relaxed max-w-3xl">
              {service.fullDescription || service.body}
            </p>
          </div>
          <div className="text-lime">
            <service.icon size={160} strokeWidth={1} className="opacity-20 md:opacity-100" />
          </div>
        </div>
      </div>

      <div className="py-24 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl mb-12 uppercase">What We Deliver</h2>
          <div className="space-y-6">
            {(service.features || []).map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <CheckCircle2 className="text-lime" size={24} />
                <span className="text-2xl font-body group-hover:text-pink transition-colors">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="brutal-card p-12 bg-pink text-black">
          <h2 className="text-5xl mb-8 uppercase">Ready to scale?</h2>
          <p className="text-xl font-body mb-10">
            Let's activate your brand across our campus network. We deliver verified results, not just impressions.
          </p>
          <button 
            onClick={() => { setPage('contact'); window.scrollTo(0, 0); }}
            className="w-full py-6 bg-black text-cream text-3xl font-display brutal-border brutal-shadow hover:bg-lime hover:text-black transition-colors"
          >
            GET IN TOUCH →
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="bg-pink min-h-screen py-24 px-6 md:px-20 flex flex-col md:flex-row gap-20">
      <div className="w-full md:w-1/2">
        <h1 className="text-[100px] md:text-[150px] leading-none text-black mb-12">LET'S <br />TALK.</h1>
        <p className="text-black text-2xl font-body mb-12 max-w-md">
          Ready to build a movement? Whether you're a brand looking for Gen Z penetration or a student leader wanting to join the force, we're live.
        </p>
        
        <div className="space-y-8">
          <a href="https://wa.me/9316106151" target="_blank" rel="noopener noreferrer" className="block brutal-card p-8 bg-black text-cream hover:bg-lime hover:text-black transition-colors">
            <div className="text-sm font-zine mb-2 opacity-60">WHATSAPP US</div>
            <div className="text-4xl font-display">93161-06151</div>
          </a>
          <a href="mailto:angel@genzverse.space" className="block brutal-card p-8 bg-cream text-black hover:bg-lime transition-colors">
            <div className="text-sm font-zine mb-2 opacity-60">EMAIL US</div>
            <div className="text-4xl font-display">angel@genzverse.space</div>
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="brutal-card p-12 bg-black text-cream relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime opacity-20 -translate-y-1/2 translate-x-1/2 rotate-45" />
          <h2 className="text-5xl mb-8">OUR SOCIALS</h2>
          <div className="grid grid-cols-1 gap-6">
            <a href="https://www.instagram.com/genzverse.io/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-4xl font-display group-hover:text-pink transition-colors">INSTAGRAM</span>
              <span className="text-2xl font-zine text-pink">→</span>
            </a>
            <a href="https://in.linkedin.com/company/genzverse" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-4xl font-display group-hover:text-lime transition-colors">LINKEDIN</span>
              <span className="text-2xl font-zine text-lime">→</span>
            </a>
            <a href="https://chat.whatsapp.com/IuFnL5VEjfS08csklpEXja?mode=ems_copy_t" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-4xl font-display group-hover:text-blue-400 transition-colors">COMMUNITY</span>
              <span className="text-2xl font-zine text-blue-400">→</span>
            </a>
          </div>
          
          <div className="mt-16 pt-8 border-t border-cream/20">
            <div className="text-sm font-body opacity-60 uppercase tracking-widest">Headquarters</div>
            <div className="text-xl font-zine mt-2">Ahmedabad // Mumbai // Delhi // India</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
              <HomePage setPage={setPage} setSelectedPost={setSelectedPost} setSelectedService={setSelectedService} />
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
              <h1 className="text-6xl font-display text-lime">FOR STUDENTS PAGE COMING SOON.</h1>
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
              <h1 className="text-6xl font-display text-pink">FOR BRANDS PAGE COMING SOON.</h1>
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
          {page === 'service' && selectedService && (
            <motion.div
              key="service"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ServicePage service={selectedService} setPage={setPage} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
