import { BlogPost } from '../types';

function parseMarkdown(content: any) {
  if (typeof content !== 'string') {
    console.error('Expected string for markdown content, got:', typeof content, content);
    return { data: {} as any, content: '' };
  }
  const frontmatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  if (!match) return { data: {} as any, content };
  
  const yaml = match[1];
  const body = match[2];
  const data: any = {};
  
  yaml.split(/\r?\n/).forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value.length > 0) {
      let val = value.join(':').trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith('[') && val.endsWith(']')) {
        data[key.trim()] = val.slice(1, -1).split(',').map(v => v.trim().replace(/^['"](.*)['"]$/, '$1'));
      } else {
        data[key.trim()] = val;
      }
    }
  });
  
  return { data, content: body };
}

export function getAllPosts(): BlogPost[] {
  const modules = (import.meta as any).glob('../contents/*.md', { query: '?raw', eager: true, import: 'default' });
  
  const posts = Object.entries(modules).map(([path, rawContent]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { data, content: body } = parseMarkdown(rawContent);
    
    return {
      slug,
      ...data,
      content: body,
    } as BlogPost;
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}
