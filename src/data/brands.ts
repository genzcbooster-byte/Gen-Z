export interface Brand {
  name: string;
  logo: string;
}

function parseMD(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const frontmatter = match[1];
  
  const data: any = {};
  frontmatter.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      try { 
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
      } catch(e) {}
      data[key] = value;
    }
  });
  return data;
}

const brandFiles = import.meta.glob('../content/brands/*.md', { query: '?raw', import: 'default', eager: true });

export const BRANDS: Brand[] = Object.values(brandFiles).map((raw: any) => {
  const data = parseMD(raw as string);
  return data as Brand;
});
