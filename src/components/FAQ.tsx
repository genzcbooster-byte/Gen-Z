import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Genzverse and how does it work?",
    answer: "Genzverse is India's premium student-first ecosystem connecting brand ambitions with campus creators and leaders. Once joined, you'll gain access to exclusive paid gigs, high-impact brand campaigns, skill workshops, and networking opportunities tailored for the next generation."
  },
  {
    question: "How long does the application review process take?",
    answer: "We review student applications on a rolling basis, typically within 24 to 48 hours. Once approved, our community managers will reach out to you directly on WhatsApp to onboard you and guide you through our active campaign boards."
  },
  {
    question: "Are there any joining fees or hidden charges?",
    answer: "No, joining the Genzverse student network is completely free. We never charge students for registration, onboarding, portal access, or career opportunities."
  },
  {
    question: "What kind of paid opportunities can I expect?",
    answer: "Our gigs span multiple domains—including digital content creation, campus activations, research & product feedback panels, social media campaigns, event planning, and creator sponsorships for leading national and global brands."
  },
  {
    question: "How are payouts calculated and distributed?",
    answer: "Payouts are project-specific, agreed upon upfront, and distributed directly via bank transfer or UPI within 7-14 days of successful campaign completion. Top performers are also highlighted on our leaderboards with added cash bonuses!"
  },
  {
    question: "Can I balance Genzverse opportunities with my college studies?",
    answer: "Absolutely. Our platform is built on a student-first philosophy. All opportunities are completely voluntary and highly flexible—you only apply for and work on campaigns that fit your current academic schedule and exam cycles."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className="w-full mt-20 border-t border-white/10 pt-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-white/5 rounded-full px-4 py-1.5 mb-4 text-[0.7rem] font-soehne font-bold uppercase tracking-widest">
          <Sparkles size="0.8rem" className="text-zinc-400" />
          Got Questions?
        </div>
        <h2 className="font-canela text-[2.2rem] md:text-[3rem] font-bold tracking-tight text-white">
          Onboarding & Expectations <span className="italic text-zinc-400 font-normal">FAQ</span>
        </h2>
        <p className="font-soehne text-zinc-500 text-xs md:text-sm max-w-[28rem] mx-auto mt-2 uppercase tracking-wider">
          // EVERYTHING YOU NEED TO KNOW ABOUT STARTING YOUR JOURNEY
        </p>
      </div>

      <div className="space-y-4 max-w-[38rem] mx-auto">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="glass-liquid-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/15"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-start gap-4 pr-4">
                  <HelpCircle size="1.2rem" className="text-zinc-500 mt-0.5 flex-shrink-0" />
                  <span className="font-soehne text-sm md:text-base font-semibold text-white tracking-wide leading-snug">
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-zinc-400 flex-shrink-0"
                >
                  <ChevronDown size="1.2rem" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pl-14 text-zinc-400 font-soehne text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
