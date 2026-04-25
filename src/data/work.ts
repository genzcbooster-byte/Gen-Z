import { parseMD } from '../lib/markdown';

export interface Campaign {
  id: string;
  brand: string;
  category: string;
  outcome: string;
  stats: string;
  gradient: string;
  textColor: string;
  logo?: string;
}

// @ts-ignore
import rawWork from '../content/work.md?raw';
const { data: workData } = parseMD(rawWork);

export const CAMPAIGNS: Campaign[] = workData.campaigns || [];
