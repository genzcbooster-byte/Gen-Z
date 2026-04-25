import yaml from 'js-yaml';

export function parseMD(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---(?:\n([\s\S]*))?$/);
  if (!match) return { data: {}, content: raw };
  const frontmatter = match[1];
  const content = match[2] || '';
  
  let data: any = {};
  try {
    data = yaml.load(frontmatter) || {};
  } catch (e) {
    console.error("YAML Parse Error:", e);
  }
  return { data, content };
}
