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

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-[160] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 px-6 py-4 md:px-12 transition-colors duration-300">
        <div className="w-full max-w-[72rem] mx-auto flex justify-between items-center">
          <Link 
            to="/"
            className="text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] font-canela font-extrabold tracking-tight cursor-pointer flex items-center" 
          >
            <span className="text-black dark:text-white transition-colors duration-300">{navData.logo_text || "GENZVERSE"}</span>
          </Link>

          <div className="hidden md:flex gap-[2.5rem] items-center">
            {navItems.map((item: any) => {
              const isActive = item.path === '/' 
                ? location.pathname === '/' 
                : location.pathname === item.path || location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={cn(
                    "font-soehne text-[1.1rem] tracking-wider uppercase relative group transition-colors duration-300",
                    "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white",
                    isActive && "text-black dark:text-white font-semibold"
                  )}
                >
                  {item.label}
                  <span className={cn(
                    "absolute -bottom-[0.25rem] left-0 h-[0.125rem] bg-black dark:bg-white transition-all group-hover:w-full",
                    isActive ? "w-full" : "w-0"
                  )} />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              className="relative z-[180] text-black dark:text-white flex flex-col justify-center items-center gap-[0.25rem] cursor-pointer p-2" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={cn("w-[1.5rem] h-[0.125rem] bg-current transition-all duration-300", isMenuOpen && "rotate-45 translate-y-[0.375rem]")} />
              <div className={cn("w-[1.5rem] h-[0.125rem] bg-current transition-all duration-300", isMenuOpen && "opacity-0")} />
              <div className={cn("w-[1.5rem] h-[0.125rem] bg-current transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-[0.375rem]")} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white dark:bg-[#0a0a0a] z-[150] flex flex-col items-center justify-center gap-8 transition-colors duration-300"
          >
            {navItems.map((item: any) => {
              const isActive = item.path === '/' 
                ? location.pathname === '/' 
                : location.pathname === item.path || location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={cn(
                    "text-[2rem] font-canela text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-300",
                    isActive && "text-black dark:text-white font-semibold"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
