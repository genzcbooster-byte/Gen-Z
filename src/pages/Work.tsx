import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';
import { ArrowUpRight, BarChart3, Target, Sparkles, Filter, Globe, RefreshCw } from 'lucide-react';
import EventsTimeline from '../components/EventsTimeline';

// @ts-ignore
import rawWork from '../content/work.md?raw';
const { data: workData } = parseMD(rawWork);

export const Work = () => {
  useSEO({
    title: "Our Work | Genzverse Campaigns",
    description: "Explore our record-breaking student marketing campaigns for brands like Dell, Samsung, and Asus. Authentic engagement across 200+ Indian colleges.",
    keywords: "student campaign case studies, campus marketing results, gen z marketing examples"
  });

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Get unique categories from campaign list
  const campaignsList = workData.campaigns || [];
  const categories = ["All", ...Array.from(new Set(campaignsList.map((c: any) => c.category))) as string[]];

  const filteredCampaigns = activeCategory === "All"
    ? campaignsList
    : campaignsList.filter((c: any) => c.category === activeCategory);

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      
      {/* Immersive Gen Z Color Gradient / Glowing Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] left-[-10%] w-[35rem] h-[35rem] bg-indigo-500/10 blur-[9rem] rounded-full animate-liquid-morph-1" />
        <div className="absolute top-[25%] right-[-5%] w-[40rem] h-[40rem] bg-emerald-500/8 blur-[10rem] rounded-full animate-liquid-morph-2" />
        <div className="absolute bottom-[30%] left-[5%] w-[35rem] h-[35rem] bg-rose-500/5 blur-[8rem] rounded-full animate-liquid-morph-1" />
        <div className="absolute bottom-[5%] right-[-10%] w-[45rem] h-[45rem] bg-lime/10 blur-[11rem] rounded-full animate-liquid-morph-2" />
        
        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 bg-pattern-grid text-white/5 opacity-15" />
        <div className="absolute inset-0 bg-pattern-dots text-white/5 opacity-25" />
      </div>

      {/* Hero Header Section */}
      <section className="pt-[11rem] pb-[6rem] px-[1.5em] md:px-[5em] relative z-10 max-w-[72rem] mx-auto text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[0.7rem] md:text-[0.75rem] font-soehne font-bold uppercase tracking-widest backdrop-blur-md">
            // OUR TRACK RECORD
          </div>
          
          <h1 className="font-canela text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-bold leading-[0.95] tracking-tight text-white mb-8">
            The <span className="italic font-normal text-zinc-400">Work</span> We <br />
            <span className="uppercase font-extrabold tracking-tighter">Deliver.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 border-t border-white/10 pt-10 text-left">
            <div className="glass-liquid-card rounded-[2rem] p-6 hover:border-white/20 transition-all duration-300">
              <div className="text-[3rem] md:text-[3.5rem] font-soehne font-semibold text-white leading-none mb-1">
                {workData.hero_stat1_value || "100+"}
              </div>
              <div className="text-[0.75rem] font-soehne font-bold text-zinc-400 uppercase tracking-widest">
                {workData.hero_stat1_label || "Campaigns Delivered"}
              </div>
            </div>
            
            <div className="glass-liquid-card rounded-[2rem] p-6 hover:border-white/20 transition-all duration-300">
              <div className="text-[3rem] md:text-[3.5rem] font-soehne font-semibold text-white leading-none mb-1">
                {workData.hero_stat2_value || "50+ Brands"}
              </div>
              <div className="text-[0.75rem] font-soehne font-bold text-zinc-400 uppercase tracking-widest">
                {workData.hero_stat2_label || "Active Clients"}
              </div>
            </div>

            <div className="glass-liquid-card rounded-[2rem] p-6 hover:border-white/20 transition-all duration-300">
              <div className="text-[3rem] md:text-[3.5rem] font-soehne font-semibold text-white leading-none mb-1">
                {workData.hero_stat3_value || "200+"}
              </div>
              <div className="text-[0.75rem] font-soehne font-bold text-zinc-400 uppercase tracking-widest">
                {workData.hero_stat3_label || "College Events Managed"}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Campaigns Filtering & Showcase Grid */}
      <section className="py-12 px-[1.5em] md:px-[5em] relative z-10 max-w-[72rem] mx-auto">
        
        {/* Modern Category Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <Filter size="1rem" />
            <span className="font-soehne text-[0.75rem] font-bold uppercase tracking-widest">Filter Campaigns</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-soehne text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 border ${
                  activeCategory === category
                    ? 'bg-white text-black border-white scale-105 shadow-[0_10px_20px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-900/40 text-zinc-400 border-white/5 hover:text-white hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.map((campaign: any, i: number) => (
              <motion.div
                layout
                key={campaign.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-[2rem] glass-liquid-card p-8 flex flex-col justify-between hover:border-white/25 hover:shadow-[0_20px_40px_rgba(255,255,255,0.04)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden relative"
              >
                {/* Background Brand Gradient Highlight Accent */}
                <div className={`absolute top-0 right-0 w-[12rem] h-[12rem] bg-gradient-to-br ${campaign.gradient} opacity-5 rounded-full blur-[4rem] group-hover:opacity-15 transition-opacity duration-500 pointer-events-none`} />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-soehne text-[0.65rem] font-bold text-zinc-500 uppercase tracking-widest border border-white/5 bg-zinc-900/50 px-3 py-1.5 rounded-full">
                      {campaign.category}
                    </span>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                      {campaign.logo ? (
                        <img 
                          src={campaign.logo} 
                          alt={campaign.brand} 
                          className="h-5 w-auto max-w-[5rem] object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Globe size="1.1rem" className="text-zinc-500" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-canela text-[2.2rem] md:text-[2.5rem] font-bold text-white tracking-tight leading-none mb-3">
                    {campaign.brand}
                  </h3>
                  
                  <p className="font-soehne text-[0.9rem] text-zinc-400 font-light leading-relaxed mb-8">
                    {campaign.outcome}
                  </p>
                </div>

                <div className="relative z-10 border-t border-white/5 pt-5 mt-auto flex items-center justify-between">
                  <div>
                    <div className="font-soehne text-[0.6rem] text-zinc-500 font-bold uppercase tracking-widest mb-1">CAMPAIGN METRICS</div>
                    <div className="font-soehne text-[1.25rem] text-white font-semibold leading-none">{campaign.stats}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                    <ArrowUpRight size="0.95rem" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Events Timeline Section (Styled cleanly within container) */}
      <div className="relative z-10 max-w-[72rem] mx-auto py-12">
        <EventsTimeline />
      </div>

      {/* Campaign Custom CTA */}
      <section className="py-[6rem] px-[1.5em] md:px-[5em] relative z-10">
        <div className="max-w-[72rem] mx-auto">
          <div className="w-full glass-liquid-card rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-10 pointer-events-none" />
            <div className="absolute -top-[10rem] w-[25rem] h-[25rem] bg-indigo-500/10 blur-[8rem] rounded-full pointer-events-none" />
            
            <div className="inline-block bg-white/10 text-white px-4 py-1.5 text-[0.675rem] font-soehne font-bold tracking-widest uppercase rounded-full border border-white/15 mb-6">
              LET'S CO-CREATE A MOVEMENT
            </div>
            
            <h2 className="text-[2.6rem] md:text-[3.8rem] lg:text-[4.2rem] font-canela font-extrabold tracking-tight leading-none mb-6 max-w-[48rem]">
              {workData.cta_heading || "WANT YOUR BRAND NEXT?"}
            </h2>
            
            <p className="font-soehne text-zinc-400 text-sm md:text-base max-w-[32rem] leading-relaxed mb-10">
              {workData.cta_body || "Stop running generic digital ads. Start activating student-driven loops and word-of-mouth networks."}
            </p>
            
            <a 
              href={workData.cta_link || "https://wa.me/9316106151"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black px-[2.5rem] py-[1.1rem] rounded-full font-soehne font-bold uppercase tracking-wider text-[1rem] hover:-translate-y-[0.125rem] hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              {workData.cta_button || "CONTACT US →"}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
