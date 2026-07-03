import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawNavbar from '../content/navbar.md?raw';
const { data: navData } = parseMD(rawNavbar);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = navData.items || [];

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-white/10 px-[1.5em] py-[1em] flex justify-between items-center">
      <Link 
        to="/"
        className="text-[2.20rem] md:text-[2rem] font-canela font-extrabold tracking-tight cursor-pointer flex items-center" 
      >
        <span className="text-white">{navData.logo_text || "GENZVERSE"}</span>
      </Link>

      <div className="hidden md:flex gap-[2.5rem]">
        {navItems.map((item: any) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "font-soehne text-[1.1rem] tracking-wider uppercase relative group transition-colors",
              "text-zinc-400 hover:text-white",
              location.pathname === item.path && "text-white font-semibold"
            )}
          >
            {item.label}
            <span className={cn(
              "absolute -bottom-[0.25rem] left-0 h-[0.125rem] bg-white transition-all group-hover:w-full",
              location.pathname === item.path ? "w-full" : "w-0"
            )} />
          </Link>
        ))}
      </div>

      <button className="md:hidden text-white z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={cn("w-[1.5rem] h-[0.125rem] bg-current mb-[0.25rem] transition-all", isMenuOpen && "rotate-45 translate-y-[0.375rem]")} />
        <div className={cn("w-[1.5rem] h-[0.125rem] bg-current mb-[0.25rem] transition-all", isMenuOpen && "opacity-0")} />
        <div className={cn("w-[1.5rem] h-[0.125rem] bg-current transition-all", isMenuOpen && "-rotate-45 -translate-y-[0.375rem]")} />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item: any) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-[2rem] font-canela text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
