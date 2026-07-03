import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BRANDS } from '../data/brands';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawBrands from '../content/brands.md?raw';
const { data: brandsData } = parseMD(rawBrands);

const Hexagon = ({ brand, index, onClick }: { brand: typeof BRANDS[0], index: number, onClick: () => void }) => {
  const isBombay = brand.name === "BOMBAY SHAVING CO";
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

export const Brands = () => {
  useSEO({
    title: "Brand Partners | Genzverse Force",
    description: "The force behind the movements. See the global brands that trust Genzverse to scale their student engagement in India.",
    keywords: "brand partners genzverse, student marketing clients, college engagement brands"
  });

  const navigate = useNavigate();
  // Create a 7x7 grid for a "large enough" feel
  const gridSize = 7;
  const totalHexagons = gridSize * gridSize;
  const gridItems = useMemo(() => Array.from({ length: totalHexagons }).map((_, i) => BRANDS[i % BRANDS.length]), [totalHexagons]);

  const handleBrandClick = (brandName: string) => {
    navigate(`/zine?search=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen py-[6rem] px-[1.5em] md:px-[5em] overflow-hidden text-black dark:text-white transition-colors duration-300">
      <div className="flex flex-col items-center text-center mb-[4rem]">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-canela text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[1.0] tracking-tight text-black dark:text-white mb-4 transition-colors duration-300"
        >
          GLOBAL <br />
          <span className="italic font-normal text-[2.75rem] md:text-[4.25rem] lg:text-[5.25rem] text-zinc-600 dark:text-zinc-400 tracking-normal transition-colors duration-300">Partnering</span> <br />
          <span className="text-black dark:text-white uppercase font-extrabold tracking-tighter transition-colors duration-300">{brandsData.hero_title || "BRANDS."}</span>
        </motion.h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-soehne text-[0.95rem] tracking-widest uppercase font-bold mt-4 transition-colors duration-300">{brandsData.hero_subtitle || "// THE FORCE BEHIND THE MOVEMENTS."}</p>
      </div>

      {/* Apple Watch Style Draggable Box */}
      <div className="brutal-card bg-white dark:bg-[#111] h-[400px] md:h-[600px] relative overflow-hidden border-[0.3125rem] border-black dark:border-white/25 cursor-move transition-colors duration-300">
        <div className="absolute inset-0 bg-pattern-grid opacity-5 pointer-events-none z-0" />
        
        <motion.div 
          drag
          dragConstraints={{ left: -800, right: 0, top: -800, bottom: 0 }}
          initial={{ x: -400, y: -400 }}
          className="absolute flex flex-col gap-1 md:gap-1 p-20"
          style={{ width: '2000px' }}
        >
          {Array.from({ length: gridSize }).map((_, rowIndex) => (
            <div 
              key={rowIndex} 
              className="flex gap-1 md:gap-1"
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

      <div className="mt-[5rem] brutal-card p-[3em] bg-purple-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-diagonal opacity-20" />
        <h2 className="font-canela text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold tracking-tight relative z-10 leading-none mb-6">
          WANT TO BE <br />
          <span className="italic font-light text-purple-200">The Next Hex?</span>
        </h2>
        <p className="font-soehne text-[1.1rem] md:text-[1.25rem] font-medium tracking-wide mb-[2rem] relative z-10">{brandsData.cta_body || "Let's build your brand's biggest movement yet."}</p>
        <a 
          href={brandsData.cta_link || "https://wa.me/9316106151"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative z-10 inline-block bg-black text-cyan-400 px-[3rem] py-[1.25rem] brutal-border-cyan-400 brutal-shadow-lime font-soehne font-bold uppercase tracking-widest text-[1rem] hover:-translate-y-[0.25rem] transition-transform"
        >
          {brandsData.cta_button || "GET IN TOUCH →"}
        </a>
      </div>
    </div>
  );
};


