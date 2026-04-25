import React from 'react';
import { Instagram, MessageCircle, Linkedin } from 'lucide-react';
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
    <div className="bg-pink min-h-screen py-[6rem] px-[1.5em] md:px-[5em] flex flex-col md:flex-row gap-[5rem]">
      <div className="w-full md:w-1/2">
        <h1 className="text-[6.25rem] md:text-[7.5rem] lg:text-[9.375rem] leading-none text-black mb-[3rem]">{contactData.hero_title_line1 || "LET'S"} <br />{contactData.hero_title_line2 || "TALK."}</h1>
        <p className="text-black text-[1.5rem] font-body mb-[3rem] max-w-[30rem]">
          {contactData.hero_subtitle || "Ready to build a movement? Whether you're a brand looking for Gen Z penetration or a student leader wanting to join the force, we're live."}
        </p>
        
        <div className="space-y-[2rem]">
          <a href={contactData.whatsapp_link || "https://wa.me/9316106151"} target="_blank" rel="noopener noreferrer" className="block brutal-card p-[2em] bg-black text-cream hover:bg-lime hover:text-black transition-colors">
            <div className="text-[0.875rem] font-zine mb-[0.5rem] opacity-60">{contactData.whatsapp_label || "WHATSAPP US"}</div>
            <div className="text-[2.5rem] font-display">{contactData.whatsapp_number || "93161-06151"}</div>
          </a>
          <a href={`mailto:${contactData.email_address || "info@genzverse.space"}`} className="block brutal-card p-[2em] bg-cream text-black hover:bg-lime transition-colors">
            <div className="text-[0.875rem] font-zine mb-[0.5rem] opacity-60">{contactData.email_label || "EMAIL US"}</div>
            <div className="text-[2.5rem] font-display break-all">{contactData.email_address || "info@genzverse.space"}</div>
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="brutal-card p-[3em] bg-black text-cream relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[8rem] h-[8rem] bg-lime opacity-20 -translate-y-1/2 translate-x-1/2 rotate-45" />
          <h2 className="text-[3rem] mb-[2rem]">{contactData.socials_heading || "OUR SOCIALS"}</h2>
          <div className="grid grid-cols-1 gap-[1.5rem]">
            <a href={contactData.instagram_link || "https://www.instagram.com/genzverse.io/"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-pink transition-colors">{contactData.instagram_label || "INSTAGRAM"}</span>
              <span className="text-[1.5rem] font-zine text-pink">→</span>
            </a>
            <a href={contactData.linkedin_link || "https://in.linkedin.com/company/genzverse"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-lime transition-colors">{contactData.linkedin_label || "LINKEDIN"}</span>
              <span className="text-[1.5rem] font-zine text-lime">→</span>
            </a>
            <a href={contactData.community_link || "https://chat.whatsapp.com/IuFnL5VEjfS08csklpEXja?mode=ems_copy_t"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[2.5rem] font-display group-hover:text-blue-400 transition-colors">{contactData.community_label || "COMMUNITY"}</span>
              <span className="text-[1.5rem] font-zine text-blue-400">→</span>
            </a>
          </div>
          
          <div className="mt-[4rem] pt-[2rem] border-t border-cream/20">
            <div className="text-[0.875rem] font-body opacity-60 uppercase tracking-widest">{contactData.hq_label || "Headquarters"}</div>
            <div className="text-[1.25rem] font-zine mt-[0.5rem]">{contactData.hq_value || "Ahmedabad // Mumbai // Delhi // India"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
