import { BlogPost } from "./types";
import { parseMD } from "./lib/markdown";

const articleFiles = (import.meta as any).glob('./content/articles/*.md', { query: '?raw', import: 'default', eager: true });

export const BLOG_POSTS: BlogPost[] = Object.values(articleFiles).map((raw: any) => {
  const { data, content } = parseMD(raw as string);
  return {
    ...data,
    content
  } as BlogPost;
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
