import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BRANDS } from '../constants';

const Hexagon = ({ brand, index, onClick }: { brand: typeof BRANDS[0], index: number, onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="relative w-[100px] h-[115px] md:w-[130px] md:h-[150px] flex items-center justify-center group cursor-grab active:cursor-grabbing transition-transform duration-300 hover:scale-110"
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        backgroundColor: index % 2 === 0 ? "#E8006F" : "#8FCC00",
      }}
    >
      <div className="absolute inset-[2px] bg-black" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
      <div className="relative z-10 p-4 flex flex-col items-center justify-center text-center pointer-events-none">
        <img 
          src={brand.logo} 
          alt={brand.name} 
          className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <span className="mt-1 text-[0.5rem] md:text-[0.6rem] font-display text-white opacity-0 group-hover:opacity-100 transition-opacity uppercase truncate max-w-full px-2">
          {brand.name}
        </span>
      </div>
    </div>
  );
};

export const Brands = () => {
  const navigate = useNavigate();
  // Create a 7x7 grid for a "large enough" feel
  const gridSize = 7;
  const totalHexagons = gridSize * gridSize;
  const gridItems = Array.from({ length: totalHexagons }).map((_, i) => BRANDS[i % BRANDS.length]);

  const handleBrandClick = (brandName: string) => {
    navigate(`/zine?search=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="bg-black min-h-screen py-[6rem] px-[1.5em] md:px-[5em] overflow-hidden">
      <div className="flex flex-col items-center text-center mb-[4rem]">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[4rem] md:text-[8rem] leading-none text-white mb-4"
        >
          BRANDS.
        </motion.h1>
        <p className="text-lime font-body tracking-widest uppercase">// THE FORCE BEHIND THE MOVEMENTS.</p>
      </div>

      {/* Apple Watch Style Draggable Box */}
      <div className="brutal-card bg-zinc-900 h-[400px] md:h-[600px] relative overflow-hidden border-[0.3125rem] border-pink cursor-move">
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
        <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        
        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-lime px-4 py-1 brutal-border text-[0.75rem] font-bold z-20 animate-pulse">
          SWIPE TO EXPLORE • CLICK TO SEE STORIES
        </div>
      </div>

      <div className="mt-[5rem] brutal-card p-[3em] bg-pink text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-diagonal opacity-20" />
        <h2 className="text-[3rem] md:text-[5rem] relative z-10">WANT TO BE THE NEXT HEX?</h2>
        <p className="font-body text-[1.25rem] mb-[2rem] relative z-10">Let's build your brand's biggest movement yet.</p>
        <a 
          href="https://wa.me/9316106151" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative z-10 inline-block bg-black text-cream px-[3rem] py-[1.25rem] brutal-border-cream brutal-shadow-lime font-zine text-[1.5rem] hover:-translate-y-[0.25rem] transition-transform"
        >
          GET IN TOUCH →
        </a>
      </div>
    </div>
  );
};


