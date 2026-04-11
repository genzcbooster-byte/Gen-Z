import React from 'react';
import { Instagram, MessageCircle, Linkedin } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="bg-pink min-h-screen py-[6rem] px-[1.5em] md:px-[5em] flex flex-col md:flex-row gap-[5rem]">
      <div className="w-full md:w-1/2">
        <h1 className="text-[6.25rem] md:text-[9.375rem] leading-none text-black mb-[3rem]">LET'S <br />TALK.</h1>
        <p className="text-black text-[1.5rem] font-body mb-[3rem] max-w-[30rem]">
          Ready to build a movement? Whether you're a brand looking for Gen Z penetration or a student leader wanting to join the force, we're live.
        </p>
        
        <div className="space-y-[2rem]">
          <a href="https://wa.me/9316106151" target="_blank" rel="noopener noreferrer" className="block brutal-card p-[2em] bg-black text-cream hover:bg-lime hover:text-black transition-colors">
            <div className="text-[0.875rem] font-zine mb-[0.5rem] opacity-60">WHATSAPP US</div>
            <div className="text-[2.5rem] font-display">93161-06151</div>
          </a>
          <a href="mailto:info@genzverse.space" className="block brutal-card p-[2em] bg-cream text-black hover:bg-lime transition-colors">
            <div className="text-[0.875rem] font-zine mb-[0.5rem] opacity-60">EMAIL US</div>
            <div className="text-[2.5rem] font-display">info@genzverse.space</div>
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="brutal-card p-[3em] bg-black text-cream relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[8rem] h-[8rem] bg-lime opacity-20 -translate-y-1/2 translate-x-1/2 rotate-45" />
          <h2 className="text-[3rem] mb-[2rem]">OUR SOCIALS</h2>
          <div className="grid grid-cols-1 gap-[1.5rem]">
            <a href="https://www.instagram.com/genzverse.io/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-pink transition-colors">INSTAGRAM</span>
              <span className="text-[1.5rem] font-zine text-pink">→</span>
            </a>
            <a href="https://in.linkedin.com/company/genzverse" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-lime transition-colors">LINKEDIN</span>
              <span className="text-[1.5rem] font-zine text-lime">→</span>
            </a>
            <a href="https://chat.whatsapp.com/IuFnL5VEjfS08csklpEXja?mode=ems_copy_t" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-blue-400 transition-colors">COMMUNITY</span>
              <span className="text-[1.5rem] font-zine text-blue-400">→</span>
            </a>
          </div>
          
          <div className="mt-[4rem] pt-[2rem] border-t border-cream/20">
            <div className="text-[0.875rem] font-body opacity-60 uppercase tracking-widest">Headquarters</div>
            <div className="text-[1.25rem] font-zine mt-[0.5rem]">Ahmedabad // Mumbai // Delhi // India</div>
          </div>
        </div>
      </div>
    </div>
  );
};
