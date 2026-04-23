import { BlogPost } from "./types";

function parseMD(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const frontmatter = match[1];
  const content = match[2];
  
  const data: any = {};
  frontmatter.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      try { 
        // Handles "string" and ["array"]
        if (value.startsWith('[') && value.endsWith(']')) {
          value = JSON.parse(value.replace(/'/g, '"'));
        } else if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
      } catch(e) {}
      data[key] = value;
    }
  });
  return { data, content };
}

const articleFiles = import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default', eager: true });

export const BLOG_POSTS: BlogPost[] = Object.values(articleFiles).map((raw: any) => {
  const { data, content } = parseMD(raw as string);
  return {
    ...data,
    content
  } as BlogPost;
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
  { value: "1,00,000", label: "indian Campus Ambassadors", suffix: "+", note: "verified ✓", color: "bg-blue-400" },
  { value: "2,000", label: "Student Creators", suffix: "+", note: "no cap", color: "bg-yellow-400" },
  { value: "50", label: "Cities Covered", suffix: "+", note: "pan-india", color: "bg-emerald-400" }
];
