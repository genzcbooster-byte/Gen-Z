import React from 'react';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { parseMD } from '../lib/markdown';

// @ts-ignore
import rawWork from '../content/work.md?raw';
const { data: workData } = parseMD(rawWork);

export const Work = () => {
  useSEO({
    title: "Our Work | Genzverse Campaigns",
    description: "Explore our record-breaking student marketing campaigns for brands like Dell, Samsung, and Asus. Authentic engagement across 200+ Indian colleges.",
    keywords: "student campaign case studies, campus marketing results, gen z marketing examples"
  });

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="pt-[10rem] pb-[6rem] px-[1.5em] md:px-[5em] border-b-[0.3125rem] border-pink">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.85] text-white font-display tracking-tighter mb-[2rem]">
            {workData.hero_title_line1 || "THE"} <br /> {workData.hero_title_line2 || "WORK."}
          </h1>
          <div className="flex flex-col md:flex-row gap-[2rem] md:gap-[4rem] mt-[4rem] border-t-[0.125rem] border-cream/20 pt-[2rem]">
            <div>
              <div className="text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-display text-lime leading-none">{workData.hero_stat1_value || "100+"}</div>
              <div className="text-[1rem] font-body text-cream/70 uppercase tracking-widest mt-2">{workData.hero_stat1_label || "Campaigns"}</div>
            </div>
            <div>
              <div className="text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-display text-pink leading-none">{workData.hero_stat2_value || "50+"}</div>
              <div className="text-[1rem] font-body text-cream/70 uppercase tracking-widest mt-2">{workData.hero_stat2_label || "International Brands"}</div>
            </div>
            <div>
              <div className="text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-display text-blue-400 leading-none">{workData.hero_stat3_value || "200+"}</div>
              <div className="text-[1rem] font-body text-cream/70 uppercase tracking-widest mt-2">{workData.hero_stat3_label || "Events"}</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Editorial Campaign Strips */}
      <section className="flex flex-col">
        {(workData.campaigns || []).map((campaign: any, i: number) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`w-full min-h-[50vh] md:min-h-[40vh] flex flex-col justify-between p-[2rem] md:p-[3rem] lg:p-[4rem] bg-gradient-to-br ${campaign.gradient} ${campaign.textColor} border-b-[0.3125rem] border-black relative overflow-hidden group`}
          >
            {/* Background noise/texture */}
            <div className="absolute inset-0 bg-pattern-dots opacity-10 mix-blend-overlay pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-[2rem]">
              <div className="text-[0.875rem] md:text-[1rem] font-body font-bold tracking-[0.2em] uppercase border-b-2 border-current pb-2">
                {campaign.category}
              </div>
              <div className="text-[1.5rem] md:text-[2rem] font-zine uppercase text-right">
                {campaign.stats}
              </div>
            </div>

            <div className="relative z-10 mt-[4rem] md:mt-[6rem]">
              <div className="flex flex-col md:flex-row md:items-center gap-[1.5rem] md:gap-[2.5rem]">
                <h2 className="text-[4rem] md:text-[5rem] lg:text-[6rem] font-display leading-[0.8] tracking-tighter group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                  {campaign.brand}
                </h2>
              </div>
              <p className="text-[1.25rem] md:text-[1.75rem] lg:text-[2rem] font-body font-medium mt-[1.5rem] max-w-[40rem] lg:max-w-[50rem] leading-tight opacity-90">
                {campaign.outcome}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-[6rem] md:py-[8rem] px-[1.5em] md:px-[5em] bg-cream text-black text-center flex flex-col items-center border-b-[0.3125rem] border-black">
        <h2 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-display leading-[0.9] tracking-tighter mb-[2rem] whitespace-pre-wrap">
          {workData.cta_heading || "WANT YOUR BRAND\nIN THIS LIST?"}
        </h2>
        <p className="text-[1.25rem] md:text-[1.5rem] font-body mb-[4rem] max-w-[30rem]">
          {workData.cta_body || "Stop running generic ads. Start building a movement with the largest student network in India."}
        </p>
        <a 
          href={workData.cta_link || "https://wa.me/9316106151"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-black text-lime px-[3rem] py-[1.5rem] brutal-border-black brutal-shadow font-zine text-[1.5rem] hover:-translate-y-[0.25rem] hover:bg-lime hover:text-black transition-all uppercase"
        >
          {workData.cta_button || "LET'S TALK →"}
        </a>
      </section>
    </div>
  );
};
