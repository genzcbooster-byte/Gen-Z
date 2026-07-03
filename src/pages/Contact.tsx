import React from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawContact from '../content/contact.md?raw';
const { data: contactData } = parseMD(rawContact);

export const Contact = () => {
  useSEO({
    title: "Contact Us | Connect with Genzverse",
    description: "Ready to build a movement? Get in touch with Genzverse for high-octane campus marketing and student-driven campaigns.",
    keywords: "contact genzverse, campus marketing inquiry, student brand collaborations"
  });

  return (
    <div className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white min-h-screen py-[6rem] px-[1.5em] md:px-[5em] relative overflow-hidden flex flex-col items-center transition-colors duration-300">
      
      {/* Liquid Glass Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-10%] w-[30rem] h-[30rem] bg-zinc-200/50 dark:bg-zinc-800/10 blur-[8rem] rounded-full animate-liquid-morph-1" />
        <div className="absolute bottom-[15%] right-[-10%] w-[35rem] h-[35rem] bg-zinc-100/40 dark:bg-zinc-900/10 blur-[9rem] rounded-full animate-liquid-morph-2" />
        <div className="absolute top-[40%] left-[40%] w-[25rem] h-[25rem] bg-zinc-300/30 dark:bg-zinc-800/10 blur-[8rem] rounded-full animate-liquid-morph-1" />
      </div>

      <div className="w-full max-w-[72rem] relative z-10 flex flex-col md:flex-row gap-12 mt-4">
        
        {/* Left Side: Copy and Direct Triggers */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="inline-block w-fit bg-black/5 dark:bg-white/5 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-6 text-[0.7rem] md:text-[0.75rem] font-soehne font-bold uppercase tracking-widest backdrop-blur-md transition-colors">
            // REACH THE ECOSYSTEM
          </div>
          
          <h1 className="font-canela text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[0.95] text-black dark:text-white tracking-tight mb-6 transition-colors">
            {contactData.hero_title_line1 || "LET'S"} <br />
            <span className="italic text-zinc-600 dark:text-zinc-400 font-normal transition-colors">{contactData.hero_title_line2 || "TALK."}</span>
          </h1>
          
          <p className="font-soehne text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-[28rem] leading-relaxed mb-12 transition-colors">
            {contactData.hero_subtitle || "Ready to build a movement? Whether you're a brand looking for Gen Z penetration or a student leader wanting to join the force, we're live."}
          </p>
          
          <div className="space-y-6">
            {/* WhatsApp Card */}
            <a 
              href={contactData.whatsapp_link || "https://wa.me/9316106151"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group glass-liquid-card rounded-[2rem] p-6 md:p-8 flex items-center justify-between border border-black/5 dark:border-white/10 hover:border-black/25 dark:hover:border-white/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] transition-all duration-500"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
                  <MessageCircle size="1.5rem" />
                </div>
                <div>
                  <div className="font-soehne text-[0.7rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-1 transition-colors">
                    {contactData.whatsapp_label || "WHATSAPP US"}
                  </div>
                  <div className="font-soehne text-[1.5rem] md:text-[1.8rem] text-black dark:text-white font-semibold tracking-tight transition-colors">
                    {contactData.whatsapp_number || "93161-06151"}
                  </div>
                </div>
              </div>
              <ArrowUpRight size="1.25rem" className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </a>

            {/* Email Card */}
            <a 
              href={`mailto:${contactData.email_address || "info@genzverse.space"}`}
              className="group glass-liquid-card rounded-[2rem] p-6 md:p-8 flex items-center justify-between border border-black/5 dark:border-white/10 hover:border-black/25 dark:hover:border-white/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] transition-all duration-500"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
                  <Mail size="1.5rem" />
                </div>
                <div>
                  <div className="font-soehne text-[0.7rem] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest mb-1 transition-colors">
                    {contactData.email_label || "EMAIL US"}
                  </div>
                  <div className="font-canela text-[1.5rem] md:text-[1.8rem] text-black dark:text-white font-bold tracking-tight break-all transition-colors">
                    {contactData.email_address || "info@genzverse.space"}
                  </div>
                </div>
              </div>
              <ArrowUpRight size="1.25rem" className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* Right Side: Social Grid and HQ */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="glass-liquid-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-black/5 dark:border-white/10">
            <div className="absolute top-0 right-0 w-[14rem] h-[14rem] bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[4rem] pointer-events-none" />
            
            <h2 className="font-canela text-[2.2rem] md:text-[2.6rem] font-bold text-black dark:text-white tracking-tight mb-8">
              {contactData.socials_heading || "Our Socials"}
            </h2>

            <div className="space-y-6">
              {/* Instagram link */}
              <a 
                href={contactData.instagram_link || "https://www.instagram.com/genzverse.io/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-between py-4 border-b border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <Instagram size="1.1rem" className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  <span className="font-canela text-[1.6rem] text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors tracking-tight">
                    {contactData.instagram_label || "INSTAGRAM"}
                  </span>
                </div>
                <ArrowUpRight size="1.1rem" className="text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LinkedIn link */}
              <a 
                href={contactData.linkedin_link || "https://in.linkedin.com/company/genzverse"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-between py-4 border-b border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <Linkedin size="1.1rem" className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  <span className="font-canela text-[1.6rem] text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors tracking-tight">
                    {contactData.linkedin_label || "LINKEDIN"}
                  </span>
                </div>
                <ArrowUpRight size="1.1rem" className="text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Community Link */}
              <a 
                href={contactData.community_link || "https://chat.whatsapp.com/IuFnL5VEjfS08csklpEXja?mode=ems_copy_t"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-between py-4 border-b border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <MessageCircle size="1.1rem" className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  <span className="font-canela text-[1.6rem] text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors tracking-tight">
                    {contactData.community_label || "COMMUNITY"}
                  </span>
                </div>
                <ArrowUpRight size="1.1rem" className="text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Headquarters Section */}
            <div className="mt-14 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <MapPin size="0.85rem" />
                <span className="font-soehne text-[0.75rem] font-bold uppercase tracking-widest">
                  {contactData.hq_label || "Headquarters"}
                </span>
              </div>
              <p className="font-canela text-[1.15rem] text-zinc-700 dark:text-zinc-300 leading-relaxed font-light italic transition-colors">
                {contactData.hq_value || "Surat // Gujarat // India"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
