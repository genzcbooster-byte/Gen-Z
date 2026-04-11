import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'WORK', path: '/work' },
    { label: 'ZINE', path: '/zine' },
    { label: 'STUDENTS', path: '/students' },
    { label: 'BRANDS', path: '/brands' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black border-b-[0.1875rem] border-pink px-[1.5em] py-[1em] flex justify-between items-center">
      <Link 
        to="/"
        className="text-[2.6rem] md:text-[2.4rem] font-display cursor-pointer flex items-center" 
        onClick={() => window.scrollTo(0, 0)}
      >
        <span className="text-pink">GENZVERSE</span>
      </Link>

      <div className="hidden md:flex gap-[2.5rem]">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={() => window.scrollTo(0, 0)}
            className={cn(
              "font-display text-[1.75rem] md:text-[1.6rem] relative group transition-colors",
              (item.label === 'STUDENTS' || item.label === 'BRANDS') ? 'text-lime hover:text-pink' : 'text-cream hover:text-pink',
              location.pathname === item.path && "text-pink"
            )}
          >
            {item.label}
            <span className={cn(
              "absolute -bottom-[0.25rem] left-0 h-[0.25rem] bg-lime transition-all group-hover:w-full",
              location.pathname === item.path ? "w-full" : "w-0"
            )} />
          </Link>
        ))}
      </div>

      <button className="md:hidden text-pink z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={cn("w-[2rem] h-[0.25rem] bg-current mb-[0.25rem] transition-all", isMenuOpen && "rotate-45 translate-y-[0.5rem]")} />
        <div className={cn("w-[2rem] h-[0.25rem] bg-current mb-[0.25rem] transition-all", isMenuOpen && "opacity-0")} />
        <div className={cn("w-[2rem] h-[0.25rem] bg-current transition-all", isMenuOpen && "-rotate-45 -translate-y-[0.5rem]")} />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-[2.25rem] font-display text-cream hover:text-pink transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
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
