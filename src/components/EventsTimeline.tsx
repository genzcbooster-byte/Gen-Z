import React, { useState } from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

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
  "QS Study Abroad": "bg-purple-500 text-white",
  "StudyIN": "bg-green-500 text-white",
  "Samsung": "bg-amber-500 text-black",
  "US Polo": "bg-pink text-black"
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
    
    const badgeColor = CATEGORY_COLORS[event.category] || "bg-gray-500 text-white";

    return (
      <div key={`${event.name}-${event.location}-${event.date}`} className={`flex gap-4 md:gap-6 relative pl-8 md:pl-0 ${isPast ? 'opacity-60' : 'opacity-100'}`}>
        {/* Timeline line for mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20 md:hidden" />
        
        {/* Mobile node */}
        <div className={`absolute left-[-4px] top-6 w-2.5 h-2.5 rounded-full md:hidden ${isPast ? 'bg-white/40' : 'bg-lime shadow-[0_0_10px_rgba(204,255,0,0.5)]'}`} />

        {/* Date block (hidden on very small screens, displayed in card instead, but let's keep it visible on md+) */}
        <div className="hidden md:flex flex-col items-end pt-2 w-[5rem] shrink-0">
          <span className="font-display text-3xl text-white leading-none">{day}</span>
          <span className="font-zine text-sm text-lime tracking-widest">{month}</span>
        </div>

        {/* Timeline Desktop Node & Line */}
        <div className="hidden md:flex flex-col items-center relative mr-2">
          {/* Node */}
          <div className={`w-4 h-4 rounded-full mt-3 z-10 brutal-border-white ${isPast ? 'bg-gray-500' : 'bg-lime'}`} />
          {/* Vertical Line */}
          <div className="absolute top-7 bottom-[-2rem] w-px bg-white/20" />
        </div>

        {/* Event Card */}
        <div className={`flex-1 brutal-card p-4 md:p-6 bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden transition-all hover:bg-white/10 ${!isPast ? 'hover:-translate-y-1 hover:border-white/30' : ''}`}>
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              {/* Mobile Date */}
              <div className="md:hidden flex items-baseline gap-2 mb-2">
                <span className="font-display text-2xl text-white leading-none">{day}</span>
                <span className="font-zine text-xs text-lime tracking-widest">{month}</span>
              </div>
              
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[0.65rem] font-bold uppercase px-2 py-0.5 tracking-wider ${badgeColor}`}>
                  {event.category}
                </span>
                {isPast && (
                  <span className="flex items-center gap-1 text-[0.65rem] font-bold uppercase text-white/60 bg-white/10 px-2 py-0.5">
                    <CheckCircle2 size={10} /> Completed
                  </span>
                )}
              </div>
              
              <h3 className={`font-display text-2xl md:text-3xl leading-tight ${isPast ? 'text-white/80' : 'text-white'}`}>
                {event.name}
              </h3>
              
              <div className="flex items-center gap-2 mt-3 text-white/70 font-body text-sm md:text-base">
                <MapPin size={16} className="text-lime shrink-0" />
                <span>{event.location}</span>
              </div>
            </div>
            
            {/* CTA button (only for upcoming) */}
            {!isPast && (
              <div className="mt-4 sm:mt-0">
                <button className="bg-lime text-black font-zine text-xs md:text-sm px-4 py-2 brutal-border-white hover:bg-white hover:text-black transition-colors uppercase whitespace-nowrap">
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
    <section className="py-[4rem] md:py-[6rem] px-[1.5em] md:px-[5em] bg-black border-b-[0.3125rem] border-pink">
      <div className="max-w-5xl mx-auto">
        <div className="mb-[3rem] md:mb-[5rem] flex flex-col items-center text-center">
          <h2 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-display text-white leading-none mb-4 whitespace-pre-wrap">
            {"THE \nTAKEOVER."}
          </h2>
          <p className="text-lime font-body text-lg uppercase tracking-widest">
            // LIVE CAMPAIGNS & ACTIVATIONS
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-[4rem]">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-zine text-xs md:text-sm uppercase tracking-wider px-4 py-2 transition-all ${
                activeFilter === filter 
                  ? 'bg-pink text-white brutal-border border-white scale-105' 
                  : 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-8 md:gap-12 relative">
          
          {upcomingEvents.length > 0 && (
            <div className="mb-8">
              {upcomingEvents.map(event => renderEvent(event, false))}
            </div>
          )}

          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <div className="text-center py-12 text-white/50 font-body uppercase tracking-widest">
              No events found for this category.
            </div>
          )}

          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-4 my-8 md:my-12">
                <div className="h-px bg-white/20 flex-1" />
                <span className="font-zine text-white/40 uppercase tracking-widest text-sm">Past Missions</span>
                <div className="h-px bg-white/20 flex-1" />
              </div>
              <div className="flex flex-col gap-8 md:gap-12">
                {pastEvents.map(event => renderEvent(event, true))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
