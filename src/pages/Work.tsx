import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';
import { ArrowUpRight, Filter, Globe } from 'lucide-react';
import { BRANDS } from '../data/brands';

// @ts-ignore
import rawWork from '../content/work.md?raw';
const { data: workData } = parseMD(rawWork);

// @ts-ignore
import rawBrands from '../content/brands.md?raw';
const { data: brandsData } = parseMD(rawBrands);

const Hexagon = ({ brand, index, onClick }: { brand: typeof BRANDS[0], index: number, onClick: () => void }) => {
  const colors = ["#00F0FF", "#B026FF", "#FFD700"];
  const borderColor = colors[index % colors.length];
  
  return (
    <div
      onClick={onClick}
      className="relative w-[100px] h-[115px] md:w-[130px] md:h-[150px] flex items-center justify-center group cursor-grab active:cursor-grabbing transition-transform duration-300 hover:scale-110"
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        backgroundColor: borderColor,
      }}
    >
      <div 
        className="absolute inset-[2px] bg-white dark:bg-zinc-950 transition-colors duration-300 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900" 
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} 
      />
      <div className="relative z-10 p-2 flex flex-col items-center justify-center text-center pointer-events-none w-full">
        <span className="text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] font-display text-black dark:text-white transition-all duration-300 uppercase leading-none break-words px-2 group-hover:scale-110">
          {brand.name}
        </span>
      </div>
    </div>
  );
};

export const Work = () => {
  useSEO({
    title: "Our Work & Brand Partners | Genzverse",
    description: "Explore our record-breaking student marketing campaigns and see the global brands that trust Genzverse to scale their student engagement in India.",
    keywords: "student campaign case studies, campus marketing results, brand partners, gen z marketing examples"
  });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const navigate = useNavigate();

  // Get unique categories from campaign list
  const campaignsList = workData.campaigns || [];
  const categories = useMemo(() => {
    const allCats = campaignsList.flatMap((c: any) => {
      if (!c.category) return [];
      return c.category.split(/\s*•\s*/).map((s: string) => s.trim());
    });
    return ["All", ...Array.from(new Set(allCats))] as string[];
  }, [campaignsList]);

  const filteredCampaigns = useMemo(() => {
    if (activeCategory === "All") return campaignsList;
    return campaignsList.filter((c: any) => {
      if (!c.category) return false;
      const parts = c.category.split(/\s*•\s*/).map((s: string) => s.trim().toLowerCase());
      return parts.includes(activeCategory.toLowerCase());
    });
  }, [campaignsList, activeCategory]);

  // Create a 7x7 grid for a "large enough" feel for the brands grid
  const gridSize = 7;
  const totalHexagons = gridSize * gridSize;
  const gridItems = useMemo(() => Array.from({ length: totalHexagons }).map((_, i) => BRANDS[i % BRANDS.length]), [totalHexagons]);

  const handleBrandClick = (brandName: string) => {
    navigate(`/zine?search=${encodeURIComponent(brandName)}`);
  };

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
      <section className="pt-[11rem] pb-[4rem] px-[1.5em] md:px-[5em] relative z-10 max-w-[72rem] mx-auto text-center md:text-left">
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
                  
                  <p className="font-soehne text-[0.9rem] text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-2 transition-colors">
                    {campaign.outcome}
                  </p>
                  
                  {campaign.location && (
                    <div className="text-[0.7rem] font-soehne font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6 transition-colors">
                      {campaign.location}
                    </div>
                  )}
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

      {/* Brand Partners Section integrated right after Work campaigns */}
      <section className="py-16 border-t border-black/10 dark:border-white/10 px-[1.5em] md:px-[5em] relative z-10 max-w-[72rem] mx-auto">
        <div className="flex flex-col items-center text-center mb-[4rem]">
          <div className="inline-block bg-black/5 dark:bg-white/5 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-6 text-[0.7rem] md:text-[0.75rem] font-soehne font-bold uppercase tracking-widest backdrop-blur-md transition-colors">
            // OUR PARTNERS
          </div>
          <h2 className="font-canela text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[1.0] tracking-tight text-black dark:text-white mb-4 transition-colors duration-300">
            GLOBAL <br />
            <span className="italic font-normal text-[2.75rem] md:text-[4.25rem] lg:text-[5.25rem] text-zinc-600 dark:text-zinc-400 tracking-normal transition-colors duration-300">Partnering</span> <br />
            <span className="text-black dark:text-white uppercase font-extrabold tracking-tighter transition-colors duration-300">{brandsData.hero_title || "BRANDS."}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-soehne text-[0.95rem] tracking-widest uppercase font-bold mt-4 transition-colors duration-300">{brandsData.hero_subtitle || "// THE FORCE BEHIND THE MOVEMENTS."}</p>
        </div>

        {/* Apple Watch Style Draggable Box */}
        <div className="brutal-card bg-white dark:bg-[#111] h-[400px] md:h-[600px] relative overflow-hidden border-[0.3125rem] border-black dark:border-white/25 cursor-move transition-colors duration-300 rounded-[2.5rem] shadow-2xl">
          <div className="absolute inset-0 bg-pattern-grid opacity-5 pointer-events-none z-0" />
          
          <motion.div 
            drag
            dragConstraints={{ left: -800, right: 0, top: -800, bottom: 0 }}
            initial={{ x: -400, y: -400 }}
            className="absolute flex flex-col gap-1 p-20"
            style={{ width: '2000px' }}
          >
            {Array.from({ length: gridSize }).map((_, rowIndex) => (
              <div 
                key={rowIndex} 
                className="flex gap-1"
                style={{ marginLeft: rowIndex % 2 === 0 ? '0' : '50px' }}
              >
                {gridItems.slice(rowIndex * gridSize, (rowIndex + 1) * gridSize).map((brand, colIndex) => (
                  <Hexagon 
                    key={`${rowIndex}-${colIndex}`} 
                    brand={brand} 
                    index={rowIndex * gridSize + colIndex} 
                    onClick={() => handleBrandClick(brand.name)}
                  />
                ))}
              </div>
            ))}
          </motion.div>

          {/* Protective Vignette */}
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]" />
          
          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/90 text-black dark:text-white px-4 py-1 brutal-border border-black dark:border-white/20 text-[0.75rem] font-bold z-20 animate-pulse transition-colors duration-300">
            SWIPE TO EXPLORE • CLICK TO SEE STORIES
          </div>
        </div>
      </section>

      {/* Integrated theme-aware brand partner cta */}
      <section className="py-[6rem] px-[1.5em] md:px-[5em] relative z-10">
        <div className="max-w-[72rem] mx-auto">
          <div className="w-full p-10 md:p-16 bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white text-center relative overflow-hidden rounded-[3rem] border border-zinc-200 dark:border-white/10 shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-pattern-diagonal text-black/5 dark:text-white/5 opacity-10 pointer-events-none" />
            <div className="absolute -top-[10rem] w-[25rem] h-[25rem] bg-zinc-500/5 dark:bg-zinc-100/5 blur-[8rem] rounded-full pointer-events-none" />
            
            <h2 className="font-canela text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold tracking-tight relative z-10 leading-none mb-6">
              WANT TO BE <br />
              <span className="italic font-light text-zinc-500 dark:text-zinc-400">The Next Hex?</span>
            </h2>
            <p className="font-soehne text-[1.1rem] md:text-[1.25rem] font-light tracking-wide mb-[2rem] relative z-10 text-zinc-600 dark:text-zinc-400">{brandsData.cta_body || "Let's build your brand's biggest movement yet."}</p>
            <a 
              href={brandsData.cta_link || "https://wa.me/9316106151"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 inline-block bg-black dark:bg-white text-white dark:text-black px-[3.5rem] py-[1.25rem] font-soehne font-bold uppercase tracking-widest text-[0.95rem] hover:-translate-y-[0.25rem] hover:shadow-2xl transition-all duration-300 rounded-full"
            >
              {brandsData.cta_button || "GET IN TOUCH →"}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

