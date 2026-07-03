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
    <footer className="bg-black text-white pt-[5rem] overflow-hidden border-t border-white/10 relative">
      <div className="absolute inset-0 bg-pattern-dots opacity-5 pointer-events-none" />
      <div className="px-[1.5rem] md:px-[5rem] grid grid-cols-1 md:grid-cols-3 gap-[3rem] mb-[5rem] relative z-10">
        <div>
          <div className="text-[2.2rem] font-canela font-extrabold tracking-tight mb-[1rem] flex items-center">
            <span className="text-white">{footerData.logo_text || "GENZVERSE"}</span>
          </div>
          <p className="font-soehne text-[0.95rem] text-zinc-400 max-w-[20rem] leading-relaxed">
            {footerData.tagline_line1 || "Student-First Marketing Ecosystem."} <br />
            {footerData.tagline_line2 || "Youth-led Campaign Force."}
          </p>
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <h4 className="font-soehne uppercase tracking-wider text-[0.8rem] text-zinc-500 mb-[1rem]">{footerData.navigate_heading || "NAVIGATE"}</h4>
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
              className="text-left font-canela text-[1.6rem] text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h4 className="font-soehne uppercase tracking-wider text-[0.8rem] text-zinc-500 mb-[1rem]">{footerData.contact_heading || "CONTACT"}</h4>
          <p className="font-soehne text-[0.95rem] text-zinc-300 leading-relaxed">
            {footerData.phone || "93161-06151"} <br />
            <a href={`mailto:${footerData.email || "info@genzverse.space"}`} className="hover:text-white underline break-all text-zinc-400 transition-colors">{footerData.email || "info@genzverse.space"}</a>
          </p>
          <div className="flex gap-[1rem] mt-[1.5rem]">
            <a href={footerData.instagram_link || "https://www.instagram.com/genzverse.io/"} target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] rounded-full border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white bg-zinc-900/50 flex items-center justify-center transition-all cursor-pointer">
              <Instagram size="1.1rem" />
            </a>
            <a href={footerData.whatsapp_link || "https://wa.me/9316106151"} target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] rounded-full border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white bg-zinc-900/50 flex items-center justify-center transition-all cursor-pointer">
              <MessageCircle size="1.1rem" />
            </a>
            <a href={footerData.linkedin_link || "https://in.linkedin.com/company/genzverse"} target="_blank" rel="noopener noreferrer" className="w-[2.5rem] h-[2.5rem] rounded-full border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white bg-zinc-900/50 flex items-center justify-center transition-all cursor-pointer">
              <Linkedin size="1.1rem" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden select-none">
        <h1 className="text-[18vw] leading-none font-canela font-extrabold text-white/5 tracking-tighter translate-y-1/4 select-none whitespace-nowrap text-center">
          {footerData.logo_text || "GENZVERSE"}
        </h1>
      </div>

      <div className="bg-zinc-900 border-t border-white/10 py-[0.75rem] overflow-hidden font-soehne text-zinc-400 text-xs tracking-wider">
        <Marquee text={footerData.bottom_marquee || "© GENZVERSE 2024–2026 • MADE BY GEN Z FOR GEN Z • INDIA • "} speed={20} />
      </div>
    </footer>
  );
};
