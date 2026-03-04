export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  heroImage: string;
  content: string;
  tags: string[];
}

export interface Service {
  title: string;
  body: string;
  icon: any;
  tag: string;
  color: string;
  fullDescription?: string;
  features?: string[];
}

export type Page = 'home' | 'work' | 'zine' | 'contact' | 'post' | 'students' | 'brands' | 'service';
