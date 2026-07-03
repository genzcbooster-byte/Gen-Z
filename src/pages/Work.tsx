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
    <div className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white min-h-screen relative overflow-hidden transition-colors duration-300">
      
      {/* Immersive Gen Z Color Gradient / Glowing Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] left-[-10%] w-[35rem] h-[35rem] bg-indigo-500/5 blur-[9rem] rounded-full animate-liquid-morph-1" />
        <div className="absolute top-[25%] right-[-5%] w-[40rem] h-[40rem] bg-emerald-500/4 blur-[10rem] rounded-full animate-liquid-morph-2" />
        <div className="absolute bottom-[30%] left-[5%] w-[35rem] h-[35rem] bg-rose-500/5 blur-[8rem] rounded-full animate-liquid-morph-1" />
        <div className="absolute bottom-[5%] right-[-10%] w-[45rem] h-[45rem] bg-lime/5 blur-[11rem] rounded-full animate-liquid-morph-2" />
        
        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 bg-pattern-grid text-black/5 dark:text-white/5 opacity-15" />
        <div className="absolute inset-0 bg-pattern-dots text-black/5 dark:text-white/5 opacity-25" />
      </div>

      {/* Hero Header Section */}
      <section className="pt-[11rem] pb-[6rem] px-[1.5em] md:px-[5em] relative z-10 max-w-[72rem] mx-auto text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-black/5 dark:bg-white/5 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-6 text-[0.7rem] md:text-[0.75rem] font-soehne font-bold uppercase tracking-widest backdrop-blur-md transition-colors">
            // OUR TRACK RECORD
          </div>
          
          <h1 className="font-canela text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-bold leading-[0.95] tracking-tight text-black dark:text-white mb-8 transition-colors">
            The <span className="italic font-normal text-zinc-600 dark:text-zinc-400 transition-colors">Work</span> We <br />
            <span className="uppercase font-extrabold tracking-tighter text-black dark:text-white transition-colors">Deliver.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 border-t border-black/10 dark:border-white/10 pt-10 text-left">
            <div className="glass-liquid-card rounded-[2rem] p-6 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
              <div className="text-[3rem] md:text-[3.5rem] font-soehne font-semibold text-black dark:text-white leading-none mb-1 transition-colors">
                {workData.hero_stat1_value || "100+"}
              </div>
              <div className="text-[0.75rem] font-soehne font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest transition-colors">
                {workData.hero_stat1_label || "Campaigns Delivered"}
              </div>
            </div>
            
            <div className="glass-liquid-card rounded-[2rem] p-6 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
              <div className="text-[3rem] md:text-[3.5rem] font-soehne font-semibold text-black dark:text-white leading-none mb-1 transition-colors">
                {workData.hero_stat2_value || "50+ Brands"}
              </div>
              <div className="text-[0.75rem] font-soehne font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest transition-colors">
                {workData.hero_stat2_label || "Active Clients"}
              </div>
            </div>

            <div className="glass-liquid-card rounded-[2rem] p-6 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300">
              <div className="text-[3rem] md:text-[3.5rem] font-soehne font-semibold text-black dark:text-white leading-none mb-1 transition-colors">
                {workData.hero_stat3_value || "200+"}
              </div>
              <div className="text-[0.75rem] font-soehne font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest transition-colors">
                {workData.hero_stat3_label || "College Events Managed"}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Campaigns Filtering & Showcase Grid */}
      <section className="py-12 px-[1.5em] md:px-[5em] relative z-10 max-w-[72rem] mx-auto">
        
        {/* Modern Category Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b border-black/10 dark:border-white/10 pb-6">
          <div className="flex items-center gap-2 text-zinc-500">
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
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-105 shadow-[0_10px_20px_rgba(0,0,0,0.15)]'
                    : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border-black/5 dark:border-white/10 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20'
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
                className="group rounded-[2rem] glass-liquid-card p-8 flex flex-col justify-between hover:border-black/25 dark:hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden relative"
              >
                {/* Background Brand Gradient Highlight Accent */}
                <div className={`absolute top-0 right-0 w-[12rem] h-[12rem] bg-gradient-to-br ${campaign.gradient} opacity-5 rounded-full blur-[4rem] group-hover:opacity-15 transition-opacity duration-500 pointer-events-none`} />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-soehne text-[0.65rem] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest border border-black/5 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 px-3 py-1.5 rounded-full transition-colors">
                      {campaign.category}
                    </span>
                    <div className="p-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl transition-colors">
                      {campaign.logo ? (
                        <img 
                          src={campaign.logo} 
                          alt={campaign.brand} 
                          className="h-5 w-auto max-w-[5rem] object-contain grayscale opacity-80 dark:opacity-60 dark:group-hover:opacity-100 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Globe size="1.1rem" className="text-zinc-500" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-canela text-[2.2rem] md:text-[2.5rem] font-bold text-black dark:text-white tracking-tight leading-none mb-3 transition-colors">
                    {campaign.brand}
                  </h3>
                  
                  <p className="font-soehne text-[0.9rem] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8 transition-colors">
                    {campaign.outcome}
                  </p>
                </div>

                <div className="relative z-10 border-t border-black/5 dark:border-white/10 pt-5 mt-auto flex items-center justify-between">
                  <div>
                    <div className="font-soehne text-[0.6rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-1 transition-colors">CAMPAIGN METRICS</div>
                    <div className="font-soehne text-[1.25rem] text-black dark:text-white font-semibold leading-none transition-colors">{campaign.stats}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-300">
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
