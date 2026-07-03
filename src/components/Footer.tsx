import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Linkedin } from 'lucide-react';
import { Marquee } from './Marquee';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawFooter from '../content/footer.md?raw';
const { data: footerData } = parseMD(rawFooter);

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-[5rem] overflow-hidden border-t border-black/10 dark:border-white/10 relative transition-colors duration-300">
      <div className="px-[1.5rem] md:px-[5rem] grid grid-cols-1 md:grid-cols-3 gap-[3rem] mb-[5rem] relative z-10">
        <div>
          <div className="text-[2.2rem] font-canela font-extrabold tracking-tight mb-[1rem] flex items-center">
            <span className="text-black dark:text-white transition-colors duration-300">{footerData.logo_text || "GENZVERSE"}</span>
          </div>
          <p className="font-soehne text-[0.95rem] text-zinc-600 dark:text-zinc-400 max-w-[20rem] leading-relaxed transition-colors duration-300">
            {footerData.tagline_line1 || "Student-First Marketing Ecosystem."} <br />
            {footerData.tagline_line2 || "Youth-led Campaign Force."}
          </p>
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <h4 className="font-soehne uppercase tracking-wider text-[0.8rem] text-zinc-400 dark:text-zinc-500 mb-[1rem]">{footerData.navigate_heading || "NAVIGATE"}</h4>
          {[
            { label: 'HOME', path: '/' },
            { label: 'WORK', path: '/work' },
            { label: 'STUDENTS', path: '/students' },
            { label: 'JOIN NOW', path: '/join-now' },
            { label: 'CONTACT', path: '/contact' }
          ].map(item => (
            <Link 
              key={item.label} 
              to={item.path}
              className="text-left font-canela text-[1.6rem] text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h4 className="font-soehne uppercase tracking-wider text-[0.8rem] text-zinc-400 dark:text-zinc-500 mb-[1rem]">{footerData.contact_heading || "CONTACT"}</h4>
          <p className="font-soehne text-[0.95rem] text-zinc-700 dark:text-zinc-300 leading-relaxed transition-colors duration-300">
            {footerData.phone || "93161-06151"} <br />
            <a href={`mailto:${footerData.email || "info@genzverse.space"}`} className="hover:text-black dark:hover:text-white underline break-all text-zinc-500 dark:text-zinc-400 transition-colors duration-300">{footerData.email || "info@genzverse.space"}</a>
          </p>
          <div className="flex gap-[1rem] mt-[1.5rem]">
            <a href={footerData.instagram_link || "https://www.instagram.com/genzverse.io/"} target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all cursor-pointer">
              <Instagram size="1.1rem" />
            </a>
            <a href={footerData.whatsapp_link || "https://wa.me/9316106151"} target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all cursor-pointer">
              <MessageCircle size="1.1rem" />
            </a>
            <a href={footerData.linkedin_link || "https://in.linkedin.com/company/genzverse"} target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all cursor-pointer">
              <Linkedin size="1.1rem" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden select-none">
        <h1 className="text-[18vw] leading-none font-canela font-extrabold text-black/5 dark:text-white/5 tracking-tighter translate-y-1/4 select-none whitespace-nowrap text-center transition-colors duration-300">
          {footerData.logo_text || "GENZVERSE"}
        </h1>
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-900 border-t border-black/10 dark:border-white/10 py-[0.75rem] overflow-hidden font-soehne text-zinc-500 dark:text-zinc-400 text-xs tracking-wider transition-colors duration-300">
        <Marquee text={footerData.bottom_marquee || "© GENZVERSE 2024–2026 • MADE BY GEN Z FOR GEN Z • INDIA • "} speed={20} />
      </div>
    </footer>
  );
};
