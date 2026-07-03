import React, { useState } from 'react';
import { MapPin, CheckCircle2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const EVENTS_DATA = [
  { date: "2026-05-09", name: "QS Study Abroad Fair", location: "New Delhi · Le Meridien", category: "QS Study Abroad" },
  { date: "2026-05-09", name: "Samsung Store AI Workshop", location: "Chennai", category: "Samsung" },
  { date: "2026-05-12", name: "QS Study Abroad Fair", location: "Hyderabad · ITC Kakatiya", category: "QS Study Abroad" },
  { date: "2026-05-14", name: "QS Study Abroad Fair", location: "Bangalore · Taj MG Road", category: "QS Study Abroad" },
  { date: "2026-05-14", name: "US Polo Store Opening", location: "Jaipur", category: "US Polo" },
  { date: "2026-05-16", name: "QS Study Abroad Fair", location: "Mumbai · The St. Regis", category: "QS Study Abroad" },
  { date: "2026-05-16", name: "StudyIN Study Abroad Fair", location: "Mumbai · Taj Lands End", category: "StudyIN" },
  { date: "2026-05-20", name: "StudyIN Study Abroad Fair", location: "Jaipur · Radisson City Center", category: "StudyIN" },
  { date: "2026-05-21", name: "StudyIN Study Abroad Fair", location: "Hyderabad · Taj Krishna", category: "StudyIN" },
  { date: "2026-05-22", name: "StudyIN Study Abroad Fair", location: "Kolkata · The Park", category: "StudyIN" },
  { date: "2026-05-23", name: "StudyIN Study Abroad Fair", location: "Chennai · Hyatt Regency", category: "StudyIN" },
  { date: "2026-05-24", name: "StudyIN Study Abroad Fair", location: "Bengaluru · Taj MG Road", category: "StudyIN" },
  { date: "2026-05-30", name: "StudyIN Study Abroad Fair", location: "Delhi · Shangri-La", category: "StudyIN" },
  { date: "2026-06-02", name: "StudyIN Study Abroad Fair", location: "Chandigarh · Taj Chandigarh", category: "StudyIN" },
  { date: "2026-06-04", name: "StudyIN Study Abroad Fair", location: "Lucknow · Taj Mahal", category: "StudyIN" }
];

const CATEGORY_COLORS: Record<string, string> = {
  "QS Study Abroad": "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
  "StudyIN": "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  "Samsung": "bg-amber-500/10 border-amber-500/30 text-amber-300",
  "US Polo": "bg-rose-500/10 border-rose-500/30 text-rose-300"
};

const FILTERS = ["All events", "QS Study Abroad", "StudyIN", "Samsung", "US Polo"];
const TODAY_STR = "2026-05-10";

export default function EventsTimeline() {
  const [activeFilter, setActiveFilter] = useState("All events");

  const filteredEvents = EVENTS_DATA.filter(event => 
    activeFilter === "All events" || event.category === activeFilter
  );

  const upcomingEvents = filteredEvents.filter(e => e.date >= TODAY_STR).sort((a, b) => a.date.localeCompare(b.date));
  const pastEvents = filteredEvents.filter(e => e.date < TODAY_STR).sort((a, b) => b.date.localeCompare(a.date));

  const renderEvent = (event: typeof EVENTS_DATA[0], isPast: boolean) => {
    const d = new Date(event.date);
    const day = d.toLocaleDateString("en-US", { day: "numeric" });
    const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    
    const badgeColor = CATEGORY_COLORS[event.category] || "bg-white/5 border-white/10 text-zinc-300";

    return (
      <div key={`${event.name}-${event.location}-${event.date}`} className={`flex gap-4 md:gap-8 relative pl-8 md:pl-0 ${isPast ? 'opacity-50' : 'opacity-100'}`}>
        {/* Timeline line for mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 md:hidden" />
        
        {/* Mobile node */}
        <div className={`absolute left-[-4px] top-6 w-2.5 h-2.5 rounded-full md:hidden ${isPast ? 'bg-zinc-700' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`} />

        {/* Date block */}
        <div className="hidden md:flex flex-col items-end pt-3 w-[6rem] shrink-0">
          <span className="font-canela text-3xl text-white font-bold leading-none">{day}</span>
          <span className="font-soehne text-[0.7rem] text-zinc-400 font-bold tracking-widest uppercase mt-1">{month}</span>
        </div>

        {/* Timeline Desktop Node & Line */}
        <div className="hidden md:flex flex-col items-center relative mr-2">
          {/* Node */}
          <div className={`w-3.5 h-3.5 rounded-full mt-4 z-10 border-2 border-black ${isPast ? 'bg-zinc-700' : 'bg-white'}`} />
          {/* Vertical Line */}
          <div className="absolute top-8 bottom-[-2rem] w-px bg-white/10" />
        </div>

        {/* Event Card */}
        <div className={`flex-1 glass-liquid-card p-5 md:p-6 rounded-[2rem] relative overflow-hidden transition-all duration-300 ${!isPast ? 'hover:-translate-y-1 hover:border-white/20' : ''}`}>
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              {/* Mobile Date */}
              <div className="md:hidden flex items-baseline gap-2 mb-3">
                <span className="font-canela text-2xl text-white font-bold leading-none">{day}</span>
                <span className="font-soehne text-xs text-zinc-400 font-bold tracking-widest uppercase">{month}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className={`text-[0.65rem] font-bold uppercase px-2.5 py-1 rounded-full border tracking-wider ${badgeColor}`}>
                  {event.category}
                </span>
                {isPast && (
                  <span className="flex items-center gap-1 text-[0.65rem] font-bold uppercase text-zinc-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={10} /> Completed
                  </span>
                )}
              </div>
              
              <h3 className={`font-canela text-xl md:text-2xl font-bold leading-snug tracking-tight ${isPast ? 'text-zinc-400' : 'text-white'}`}>
                {event.name}
              </h3>
              
              <div className="flex items-center gap-2 mt-4 text-zinc-400 font-soehne text-xs md:text-sm">
                <MapPin size={14} className="text-zinc-500 shrink-0" />
                <span>{event.location}</span>
              </div>
            </div>
            
            {/* CTA button (only for upcoming) */}
            {!isPast && (
              <div className="mt-4 sm:mt-0 self-end sm:self-center">
                <button className="bg-white text-black font-soehne text-xs font-bold px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors uppercase whitespace-nowrap">
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-[4rem] px-[1.5em] md:px-0">
      <div className="max-w-4xl mx-auto">
        <div className="mb-[3.5rem] flex flex-col items-center text-center">
          <h2 className="font-canela text-[2.8rem] md:text-[3.8rem] lg:text-[4.2rem] text-white leading-none mb-3">
            The Takeover
          </h2>
          <p className="text-zinc-500 font-soehne text-xs md:text-sm uppercase tracking-widest">
            // LIVE CAMPAIGNS & ACTIVATIONS IN THE WILD
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-soehne text-[0.7rem] font-bold uppercase tracking-widest px-4.5 py-2 rounded-full transition-all duration-300 border ${
                activeFilter === filter 
                  ? 'bg-white text-black border-white scale-105' 
                  : 'bg-zinc-900/40 text-zinc-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-8 md:gap-12 relative">
          
          {upcomingEvents.length > 0 && (
            <div className="flex flex-col gap-8 md:gap-10">
              {upcomingEvents.map(event => renderEvent(event, false))}
            </div>
          )}

          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <div className="text-center py-12 text-zinc-500 font-soehne uppercase tracking-widest text-xs">
              No events found for this category.
            </div>
          )}

          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-4 my-10 md:my-14">
                <div className="h-px bg-white/5 flex-1" />
                <span className="font-soehne text-zinc-600 uppercase tracking-widest text-[0.65rem] font-bold">Past Missions</span>
                <div className="h-px bg-white/5 flex-1" />
              </div>
              <div className="flex flex-col gap-8 md:gap-10">
                {pastEvents.map(event => renderEvent(event, true))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
