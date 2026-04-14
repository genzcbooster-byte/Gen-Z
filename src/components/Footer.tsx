import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Linkedin } from 'lucide-react';
import { Marquee } from './Marquee';

export const Footer = () => {
  return (
    <footer className="bg-cream text-black pt-[5rem] overflow-hidden border-t-[0.3125rem] border-black relative">
      <div className="absolute inset-0 bg-pattern-dots opacity-5 pointer-events-none" />
      <div className="px-[1.5rem] md:px-[5rem] grid grid-cols-1 md:grid-cols-3 gap-[3rem] mb-[5rem] relative z-10">
        <div>
          <div className="text-[2.5rem] font-display mb-[1rem] flex items-center">
            <span className="text-pink">GENZVERSE</span>
          </div>
          <p className="text-[0.875rem] font-bold max-w-[20rem]">
            Student-First Marketing Ecosystem. <br />
            Youth-led Campaign Force.
          </p>
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <h4 className="font-zine text-[1.25rem] mb-[0.5rem]">NAVIGATE</h4>
          {[
            { label: 'HOME', path: '/' },
            { label: 'WORK', path: '/work' },
            { label: 'ZINE', path: '/zine' },
            { label: 'CONTACT', path: '/contact' }
          ].map(item => (
            <Link 
              key={item.label} 
              to={item.path}
              className="text-left font-display text-[1.5rem] hover:text-pink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h4 className="font-zine text-[1.25rem] mb-[0.5rem]">CONTACT</h4>
          <p className="font-body text-[0.875rem]">
            93161-06151 <br />
            <a href="mailto:genzverse@gmail.com" className="hover:text-pink underline break-all">genzverse@gmail.com</a>
          </p>
          <div className="flex gap-[1rem] mt-[1.5rem]">
            <a href="https://www.instagram.com/genzverse.io/" target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] brutal-border bg-pink text-white flex items-center justify-center font-zine rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Instagram size="1.25rem" />
            </a>
            <a href="https://wa.me/9316106151" target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] brutal-border bg-lime text-black flex items-center justify-center font-zine -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <MessageCircle size="1.25rem" />
            </a>
            <a href="https://in.linkedin.com/company/genzverse" target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] brutal-border bg-blue-600 text-white flex items-center justify-center font-zine rotate-6 hover:rotate-0 transition-transform cursor-pointer">
              <Linkedin size="1.25rem" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative">
        <h1 className="text-[20vw] leading-none font-display text-pink opacity-100 translate-y-1/4 select-none">GENZVERSE</h1>
      </div>

      <div className="bg-lime border-t-[0.1875rem] border-black py-[0.5rem] overflow-hidden">
        <Marquee text="© GENZVERSE 2024–2026 • MADE BY GEN Z FOR GEN Z • INDIA • " speed={20} />
      </div>
    </footer>
  );
};
