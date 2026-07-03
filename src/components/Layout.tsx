import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isDismissed, setIsDismissed] = useState(false);

  // Showcase everywhere (no excluded pages)
  const showOverlay = !isDismissed;

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="grain-overlay" />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-[100] w-full"
          >
            <div className="glass-liquid-card py-4 px-6 rounded-none border-t border-b-0 border-l-0 border-r-0 border-black/10 dark:border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.4)] flex items-center relative overflow-hidden group transition-colors duration-300">
              {/* Subtle background glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 blur-xl opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex-1 flex justify-center relative z-10">
                <Link
                  to="/join-now"
                  className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-16 py-3.5 rounded-xl font-soehne font-bold uppercase tracking-widest text-[0.9rem] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300"
                >
                  Join Now <ArrowRight size="1rem" />
                </Link>
              </div>
              
              <button 
                onClick={() => setIsDismissed(true)}
                className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-zinc-500 hover:text-black dark:hover:text-white transition-colors relative z-10 cursor-pointer absolute right-4 md:right-8 top-1/2 -translate-y-1/2"
                title="Dismiss"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
