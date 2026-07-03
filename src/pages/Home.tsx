import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Marquee } from '../components/Marquee';
import { SlotCounter } from '../components/SlotCounter';
import { BRANDS } from '../data/brands';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawHome from '../content/home.md?raw';
const { data: homeData } = parseMD(rawHome);

const brandCategories = [
  {
    index: "01",
    title: "Youth Marketing",
    iconName: "Target",
    description: "Unlock direct penetration into college campuses. We design high-impact micro-influencer campaigns and localized experiential setups to make your brand the student default."
  },
  {
    index: "02",
    title: "Creator Marketing",
    iconName: "Tv",
    description: "Activate hyper-local student creators who speak the native language of Gen Z. From authentic reels to viral challenges, we script organic narratives that convert attention."
  },
  {
    index: "03",
    title: "Brand Activations",
    iconName: "Sparkles",
    description: "Immersive experiential campaigns built inside college fests and campus clusters. We craft real-world touchpoints that connect students with your brand physically."
  },
  {
    index: "04",
    title: "Campaign Workforce",
    iconName: "Users",
    description: "Power your ground campaigns with elite student workforces. Highly organized, fast-deploying team of student leaders, event hosts, and campus coordinators on-demand."
  },
  {
    index: "05",
    title: "Consumer Research",
    iconName: "Search",
    description: "Get real-time raw feedback from the youth demographic. We run focus groups, quantitative surveys, and trend mapping directly inside our massive community channels."
  },
  {
    index: "06",
    title: "TSF The Samvidhan Forum",
    iconName: "Award",
    description: "A prestigious social impact and civic dialogue initiative across top tier colleges, bringing together tomorrow's leaders to discuss nation-building and policy."
  }
];

const studentCategories = [
  {
    index: "01",
    title: "Paid Gigs",
    iconName: "IndianRupee",
    description: "Earn while you learn. Get matched with leading national and global brands for paid marketing, campus activations, research, and creative gigs."
  },
  {
    index: "02",
    title: "Campus Ambassador Programs",
    iconName: "Compass",
    description: "Represent India's biggest brands on your campus. Gain leadership experience, expand your network, and build a stellar resume with exclusive credentials."
  },
  {
    index: "03",
    title: "Creator Opportunities",
    iconName: "Zap",
    description: "Level up your creator journey. Gain access to brand sponsorships, exclusive content workshops, professional creator equipment, and creative mentorship."
  },
  {
    index: "04",
    title: "Events & Experiences",
    iconName: "PartyPopper",
    description: "Get VIP access to premium concerts, student summits, campus workshops, and high-energy networking events with top industry mentors."
  },
  {
    index: "05",
    title: "Career Growth",
    iconName: "TrendingUp",
    description: "Bridge the gap from campus to corporate. Access exclusive internships, career mentoring programs, letter of recommendations, and soft skill training."
  }
];

export const Home = () => {
  useSEO({
    title: "Genzverse | India's Leading Student First Marketing Ecosystem",
    description: "Genzverse bridges the gap between top brands and the massive Indian student community. India's coolest student community through 1,0,000+ campus ambassadors.",
    keywords: "youth marketing agency, student marketing india, campus ambassador program, gen z branding, college influencer marketing",
    image: "https://i.postimg.cc/cCN86MQF/Untitled-design-3-removebg-preview.png"
  });

  const monoColors = ['bg-white', 'bg-zinc-50', 'bg-zinc-100'];

  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* Hero Section */}
      <section className="h-screen bg-black flex flex-col items-center justify-center px-[1.5em] md:px-[5em] relative overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-pattern-grid text-white/5 opacity-20" />
          <div className="absolute -top-[5rem] -left-[5rem] w-[37.5rem] h-[37.5rem] bg-zinc-700/10 blur-[7.5rem] rounded-full animate-liquid-morph-1 will-change-transform" />
          <div className="absolute -bottom-[5rem] -right-[5rem] w-[31.25rem] h-[31.25rem] bg-zinc-800/15 blur-[6.25rem] rounded-full animate-liquid-morph-2 will-change-transform" />
          <div className="absolute inset-0 bg-pattern-dots text-white/5 opacity-30" />
          <div 
            className="absolute left-0 right-0 h-[0.125rem] bg-white/10 shadow-[0_0_0.9375rem_rgba(255,255,255,0.1)] z-0 will-change-transform"
            style={{
              animation: 'scanline 8s linear infinite'
            }}
          />
        </div>

        <div className="z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
          <div className="inline-block bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 mb-[1.5rem] text-[0.7rem] md:text-[0.75rem] font-soehne font-bold uppercase tracking-widest backdrop-blur-md">
            {homeData.hero_tag || "Student First Marketing Ecosystem"}
          </div>
          <h1 className="font-canela text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[1.0] mb-[1.5rem] text-white tracking-tight">
            {homeData.hero_title_line1 || "INDIA'S"} <br />
            <span className="italic font-normal text-[2.75rem] md:text-[4.25rem] lg:text-[5.25rem] text-zinc-300 tracking-normal">{homeData.hero_title_line2 || "COOLEST"}</span> <br />
            <span className="text-white uppercase font-extrabold tracking-tighter">{homeData.hero_title_highlight || "STUDENT COMMUNITY."}</span>
          </h1>
          <p className="text-zinc-400 font-soehne text-[1.06rem] md:text-[1.15rem] mb-[2.5rem] max-w-[36rem] leading-relaxed">
            {homeData.hero_subtitle || "// Scaling Potential"}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-zinc-950 border-t border-white/10 z-20">
          <Marquee text={homeData.hero_marquee || "GENZVERSE • INDIA'S #1 STUDENT FIRST MARKETING ECOSYSTEM • SINCE MAY 2024 • CAMPUS TO CAMPAIGN • VERIFIED RESULTS • "} />
        </div>
      </section>

      {/* Stats Slam */}
      <section className="bg-white text-black py-[5em] px-[1.5em] md:px-[5em] border-y border-zinc-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[16rem] h-[16rem] bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[8rem]" />
        <div className="flex flex-col items-center text-center mb-[4rem]">
          <h2 className="font-canela text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold uppercase tracking-tight mb-[0.5rem] relative z-10 text-black">{homeData.stats_heading || "OUR NETWORK"}</h2>
          <div className="w-[4rem] h-[0.25rem] bg-black relative z-10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-[4rem] max-w-[72rem] mx-auto">
          {(homeData.stats || []).map((stat: any, i: number) => {
            const currentBg = monoColors[i % monoColors.length];
            return (
              <div
                key={i}
                className={`rounded-[2rem] border border-zinc-200 p-8 relative group ${currentBg} flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300 overflow-hidden`}
              >
                <div className="text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-soehne font-semibold text-black mb-2 leading-none tracking-tight">
                  <SlotCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[0.9rem] font-soehne font-medium leading-tight text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                <div className="absolute -top-[0.25rem] -right-[0.25rem] bg-black text-white px-[0.75rem] py-[0.25rem] text-[0.625rem] font-soehne font-bold tracking-wider uppercase rounded-bl-[1rem]">
                  {stat.note}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center relative z-10">
          <Link 
            to={homeData.stats_cta_link || "/work"}
            className="bg-black text-white px-[3rem] py-[1.25rem] rounded-full font-soehne font-bold uppercase tracking-wider text-[1.1rem] hover:-translate-y-[0.25rem] hover:shadow-2xl transition-all duration-300"
          >
            {homeData.stats_cta || "SEE OUR CASE STUDIES →"}
          </Link>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-black py-[6em] px-[1.5em] md:px-[5em] relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-pattern-grid text-white/5 opacity-10 pointer-events-none" />
        
        {/* Section Heading in Canela Display */}
        <div className="flex flex-col items-center text-center mb-[3.5rem]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-canela text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-bold text-white lowercase tracking-tight"
          >
            {homeData.services_heading_start || "What we"} <span className="text-white italic font-light lowercase font-canela tracking-normal border-b border-white pb-0.5">{homeData.services_heading_highlight || "actually"}</span> {homeData.services_heading_end || "do."}
          </motion.h2>
        </div>

        {/* Brand Mantra / Copy in Canela Display */}
        <div className="max-w-[54rem] mx-auto text-center mb-24 px-4">
          <p className="font-canela text-[1.8rem] md:text-[2.6rem] text-white leading-tight font-light tracking-tight">
            We connect students with leading brands through <span className="italic text-zinc-400 font-normal">paid opportunities</span>, real-world experiences, and <span className="italic text-zinc-400 font-normal">career growth</span>.
          </p>
        </div>

        {/* Liquid Glass Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[20%] left-[10%] w-[25rem] h-[25rem] bg-indigo-500/10 blur-[8rem] rounded-full animate-liquid-morph-1" />
          <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-emerald-500/10 blur-[9rem] rounded-full animate-liquid-morph-2" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-rose-500/5 blur-[8rem] rounded-full animate-liquid-morph-1" />
        </div>

        {/* CATEGORY 2: FOR STUDENTS */}
        <div className="max-w-[72rem] mx-auto relative z-10 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6">
            <div>
              <h3 className="font-canela text-[2.4rem] md:text-[3rem] font-bold text-white tracking-tight">
                For Students
              </h3>
              <p className="font-soehne text-zinc-500 text-xs tracking-widest uppercase mt-1">
                // Gateway to elite brand networks & growth avenues
              </p>
            </div>
            <span className="font-soehne text-[0.8rem] text-zinc-400 tracking-wider uppercase border border-white/10 px-4 py-1.5 rounded-full bg-zinc-900/50 mt-4 md:mt-0 backdrop-blur-md">
              [Opportunities]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {studentCategories.map((category, index) => {
              const Icon = (LucideIcons as any)[category.iconName] || LucideIcons.Zap;
              return (
                <div 
                  key={index}
                  className="rounded-[2rem] p-8 glass-liquid-card transition-all duration-500 flex flex-col justify-between group relative overflow-hidden hover:border-white/25 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-300 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
                        <Icon size="1.25rem" />
                      </div>
                      <span className="font-canela text-[2.5rem] text-zinc-800/80 group-hover:text-white/20 transition-colors duration-500 select-none font-bold leading-none">
                        {category.index}
                      </span>
                    </div>
                    <h4 className="font-canela text-[1.45rem] md:text-[1.6rem] font-bold text-white tracking-tight mb-3 group-hover:text-white transition-colors">
                      {category.title}
                    </h4>
                    <p className="font-soehne text-[0.875rem] text-zinc-400 font-light leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Link 
              to="/join-now"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-soehne font-bold uppercase tracking-wider text-[0.95rem] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              Join the ecosystem now <LucideIcons.ArrowRight size="1.1rem" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CATEGORY 1: FOR BRANDS */}
        <div className="max-w-[72rem] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6">
            <div>
              <h3 className="font-canela text-[2.4rem] md:text-[3rem] font-bold text-white tracking-tight">
                For Brands
              </h3>
              <p className="font-soehne text-zinc-500 text-xs tracking-widest uppercase mt-1">
                // B2B Solutions & Localized Youth Operations at Scale
              </p>
            </div>
            <span className="font-soehne text-[0.8rem] text-zinc-400 tracking-wider uppercase border border-white/10 px-4 py-1.5 rounded-full bg-zinc-900/50 mt-4 md:mt-0 backdrop-blur-md">
              [B2B Solutions]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCategories.map((category, index) => {
              const Icon = (LucideIcons as any)[category.iconName] || LucideIcons.Sparkles;
              return (
                <div 
                  key={index}
                  className="rounded-[2rem] p-8 glass-liquid-card transition-all duration-500 flex flex-col justify-between group relative overflow-hidden hover:border-white/25 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-300 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
                        <Icon size="1.25rem" />
                      </div>
                      <span className="font-canela text-[2.5rem] text-zinc-800/80 group-hover:text-white/20 transition-colors duration-500 select-none font-bold leading-none">
                        {category.index}
                      </span>
                    </div>
                    <h4 className="font-canela text-[1.45rem] md:text-[1.6rem] font-bold text-white tracking-tight mb-3 group-hover:text-white transition-colors">
                      {category.title}
                    </h4>
                    <p className="font-soehne text-[0.875rem] text-zinc-400 font-light leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Wall */}
      <section className="bg-zinc-50 text-black py-16 relative overflow-hidden border-b border-zinc-200">
        <div className="absolute inset-0 bg-pattern-dots opacity-5 pointer-events-none" />
        <div className="flex flex-col items-center text-center mb-[2.5rem]">
          <h2 className="font-canela text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold uppercase tracking-tight mb-[1rem] relative z-10 text-black">
            {homeData.brand_wall_heading || "BRANDS WE'VE MOVED."}
          </h2>
          <div className="w-[4rem] h-[0.25rem] bg-black relative z-10" />
        </div>
        <div className="relative z-10 mb-14">
          <Marquee text={BRANDS.map(b => b.name).join(" • ")} speed={40} className="bg-white border-y border-zinc-200 py-3 text-black font-soehne font-bold" />
        </div>

        <div className="mt-[2rem] px-[1.5em] md:px-[5em] relative z-10 flex justify-center max-w-[72rem] mx-auto">
          <div className="w-full bg-zinc-950 border border-white/10 rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-pattern-grid text-white pointer-events-none" />
            <div className="z-10 text-center md:text-left relative">
              <div className="inline-block bg-white/10 text-white px-3.5 py-1 text-[0.675rem] font-soehne tracking-widest uppercase rounded-full border border-white/15 mb-4">
                {homeData.contact_banner_tag || "Let's build a movement."}
              </div>
              <h3 className="text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem] text-white font-canela font-extrabold tracking-tight leading-none">{homeData.contact_banner_heading || "YOUR BRAND NEXT?"}</h3>
            </div>
            <a 
              href={homeData.contact_banner_link || "https://wa.me/9316106151"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="z-10 bg-white text-black px-[2.5rem] py-[1.1rem] rounded-full font-soehne font-bold uppercase tracking-wider text-[1rem] hover:-translate-y-[0.125rem] hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              {homeData.contact_banner_cta || "→ CONTACT US"}
            </a>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="bg-black py-[5em] px-[1.5em] md:px-[5em] relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-[3.5rem] gap-[2rem] text-center md:text-left max-w-[72rem] mx-auto">
          <div className="w-full flex flex-col items-center md:items-start">
            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] font-canela font-bold tracking-tight text-white">{homeData.cities_heading || "OUR TURF."}</h2>
            <p className="text-zinc-500 font-soehne mt-2 text-[0.875rem] md:text-[1rem] uppercase tracking-widest">{homeData.cities_subtitle || "// Tier-1 and Tier-2 penetration. 15+ cities and counting."}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[72rem] mx-auto">
          {(homeData.cities || []).map((city: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className="rounded-[1.75rem] glass-liquid-card p-[1.5rem] group hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_12px_24px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-default min-h-[9rem] flex flex-col justify-between overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[0.625rem] font-soehne font-bold text-zinc-500 group-hover:text-zinc-300 mb-1">0{i+1}</div>
                <h3 className="text-[1.25rem] md:text-[1.45rem] font-canela font-bold text-white tracking-tight truncate">{city.name}</h3>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 relative z-10">
                <div className="text-[0.7rem] font-soehne font-bold text-zinc-400 group-hover:text-zinc-200 uppercase tracking-wider">{city.stat}</div>
              </div>
            </motion.div>
          ))}
          <div className="rounded-[1.75rem] glass-liquid-card p-[1.5rem] flex items-center justify-center text-center group hover:-translate-y-1 hover:border-white/25 transition-all duration-300 min-h-[9rem] overflow-hidden relative">
            <div className="font-soehne font-extrabold text-white text-[0.9rem] tracking-widest uppercase leading-tight whitespace-pre-wrap">{homeData.cities_more_text || "AND \nMANY \nMORE."}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
