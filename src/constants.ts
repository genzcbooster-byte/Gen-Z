import { BlogPost } from "./types";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "001",
    slug: "eatsure-mumbai-campaign",
    title: "How We Generated 1,500 Verified Actions for EatSure",
    category: "CAMPAIGN STORY",
    date: "2026-02-15",
    author: "GENZVERSE TEAM",
    excerpt: "Breaking down the Mumbai campus takeover that moved the needle for EatSure.",
    heroImage: "https://play-lh.googleusercontent.com/rge1TD1xUvaa32NNReRUFkAFWW9rqnpbRFt3_LfwKy--H26l29b236FUM4TCIF5mqTDA0-LDOmyln-r4rvQZmDk",
    content: `
      <h2>The Challenge</h2>
      <p>EatSure wanted to penetrate the dense college market in Mumbai. They didn't want just 'brand awareness'—they wanted verified app installs and orders.</p>
      <blockquote>"THE FUTURE OF BRAND LOYALTY IS BUILT ON PARTICIPATION, NOT OBSERVATION."</blockquote>
      <h2>The Strategy</h2>
      <p>We activated 50+ campus leads across Mumbai's top colleges. Instead of generic posters, we created exclusive 'EatSure Zones' where students could experience the brand first-hand.</p>
      <h3>Key Results</h3>
      <ul>
        <li>1,500+ Verified Actions</li>
        <li>45% Retention Rate</li>
        <li>10+ Campus Takeovers</li>
      </ul>
    `,
    tags: ["campaigns", "food-tech", "mumbai"]
  },
  {
    id: "002",
    slug: "gemini-whatsapp-empire",
    title: "Building a 1,510 Member WhatsApp Empire for Gemini",
    category: "CULTURE",
    date: "2026-01-20",
    author: "GENZVERSE TEAM",
    excerpt: "How we turned a simple messaging app into a high-conversion community hub.",
    heroImage: "https://picsum.photos/seed/gemini/1200/800",
    content: `
      <h2>Community First</h2>
      <p>Gemini needed a direct line to students. We bypassed the noise of Instagram and went straight to where the conversations happen: WhatsApp.</p>
      <p>In just 3 weeks, we scaled to 1,510 active members across 15 college-specific groups.</p>
    `,
    tags: ["community", "tech", "whatsapp"]
  },
  {
    id: "003",
    slug: "ispl-surat-conversions",
    title: "500+ Conversions in Surat: The ISPL Breakdown",
    category: "DROPS",
    date: "2026-02-01",
    author: "GENZVERSE TEAM",
    excerpt: "Surat isn't just a diamond city; it's a high-conversion playground for the right brand.",
    heroImage: "https://picsum.photos/seed/ispl/1200/800",
    content: `
      <h2>Local Context Matters</h2>
      <p>Surat has a unique student culture. We leveraged local influencers and campus events to drive 500+ direct conversions for ISPL.</p>
    `,
    tags: ["events", "surat", "ispl"]
  },
  {
    id: "004",
    slug: "zuno-verified-actions",
    title: "5,000+ Verified Actions: The Zuno Masterclass",
    category: "CAMPAIGN STORY",
    date: "2026-03-01",
    author: "GENZVERSE TEAM",
    excerpt: "How we scaled Zuno's student acquisition through a multi-city campus network.",
    heroImage: "https://picsum.photos/seed/zuno/1200/800",
    content: `
      <h2>Scaling Student Acquisition</h2>
      <p>Zuno needed a massive influx of verified student users. We deployed our network across 10+ cities to deliver over 5,000 verified actions in record time.</p>
    `,
    tags: ["acquisition", "zuno", "scale"]
  },
  {
    id: "005",
    slug: "district-app-stories",
    title: "4,000+ Instagram Stories: The District App Takeover",
    category: "CULTURE HITS",
    date: "2026-02-28",
    author: "GENZVERSE TEAM",
    excerpt: "Turning digital engagement into a physical movement with District App.",
    heroImage: "https://picsum.photos/seed/district/1200/800",
    content: `
      <h2>Digital to Physical</h2>
      <p>We created a viral loop that resulted in 4,000+ organic Instagram stories, making District App the talk of the campus.</p>
    `,
    tags: ["viral", "instagram", "district"]
  },
  {
    id: "006",
    slug: "dell-gaming-influencers",
    title: "Dell Gaming: Influencer Management Across 9 Cities",
    category: "BRAND BREAKDOWN",
    date: "2026-02-10",
    author: "GENZVERSE TEAM",
    excerpt: "Managing a complex web of influencers and events for a global giant.",
    heroImage: "https://picsum.photos/seed/dell/1200/800",
    content: `
      <h2>Global Brand, Local Voice</h2>
      <p>We bridged the gap between Dell's global standards and local student preferences through strategic influencer management.</p>
    `,
    tags: ["gaming", "dell", "influencers"]
  }
];

export const CITIES = [
  { name: "MUMBAI", stat: "LIVE", active: true },
  { name: "DELHI", stat: "LIVE", active: true },
  { name: "BENGALURU", stat: "LIVE", active: true },
  { name: "HYDERABAD", stat: "LIVE", active: true },
  { name: "SURAT", stat: "HOME BASE", active: true },
  { name: "AHMEDABAD", stat: "LIVE", active: true },
  { name: "PUNE", stat: "LIVE", active: true },
  { name: "KOLKATA", stat: "LIVE", active: true },
  { name: "CHENNAI", stat: "LIVE", active: true }
];

export const STATS = [
  { value: "1,500+", label: "Verified Actions — EatSure Mumbai", note: "verified ✓", color: "bg-blue-400" },
  { value: "300+", label: "Conversions — ISPL Surat 2026", note: "no cap", color: "bg-yellow-400" },
  { value: "4,000+", label: "Instagram Stories — District Events", note: "verified ✓", color: "bg-purple-400" },
  { value: "2,250+", label: "Participants — Gaming Events (Dell, ASUS, HP)", note: "gaming", color: "bg-emerald-400" },
  { value: "Many More", label: "Campaigns & Activations", note: "live", color: "bg-pink" }
];

export const BRANDS = ["GEMINI", "EATSURE", "ISPL", "DISTRICT APP", "DELL", "ASUS", "HP", "SHEIN", "IIT BOMBAY", "MOOD INDIGO"];
