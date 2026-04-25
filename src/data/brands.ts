import { parseMD } from '../lib/markdown';

export interface Brand {
  name: string;
  logo: string;
}

const brandFiles = import.meta.glob('../content/brands/*.md', { query: '?raw', import: 'default', eager: true });

export const BRANDS: Brand[] = Object.values(brandFiles).map((raw: any) => {
  const { data } = parseMD(raw as string);
  return data as Brand;
});
