import { parseMD } from '../lib/markdown';

export interface LeaderboardEntry {
  id: string;
  name: string;
  earned: string;
  rank: number;
  location?: string;
}

// @ts-ignore
import rawStudents from '../content/students.md?raw';
const { data: studentsData } = parseMD(rawStudents);

const RAW_LIST: string[] = studentsData.leaderboard_raw_list || [];

const parseEntry = (entry: string) => {
  // Try to match the pattern: Name - Amount [Currency] Location
  // Also handles cases without hyphens like "Smit 10745 ahemdabad"
  const match = entry.match(/([a-zA-Z\s&]+?)\s*(?:[-|]\s*)?([\d,.]+(?:\s?K|rs)?)\s*(?:approx\s*)?(?:[-|]\s*)?([a-zA-Z\s]*)/i);
  
  if (match) {
    const name = match[1].trim();
    let amountStr = match[2].trim().toLowerCase();
    const location = match[3].trim();
    
    // Convert K to thousands
    let numericValue = 0;
    if (amountStr.endsWith('k')) {
      numericValue = parseFloat(amountStr.replace('k', '')) * 1000;
    } else {
      numericValue = parseFloat(amountStr.replace(/[^0-9.]/g, ''));
    }

    // Format amount nicely (e.g., 1,67,720)
    const formattedAmount = numericValue.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    });

    // Capitalize location
    const formattedLocation = location 
      ? location.charAt(0).toUpperCase() + location.slice(1).toLowerCase() 
      : "India";

    return {
      name,
      earned: `₹${formattedAmount}`,
      value: numericValue,
      location: formattedLocation
    };
  }
  return null;
};

export const LEADERBOARD_DATA: LeaderboardEntry[] = RAW_LIST
  .map(parseEntry)
  .filter((entry): entry is NonNullable<ReturnType<typeof parseEntry>> => entry !== null)
  .sort((a, b) => b.value - a.value)
  .map((entry, index) => ({
    id: `ambassador-${index + 1}`,
    rank: index + 1,
    name: entry.name,
    earned: entry.earned,
    location: entry.location
  }));
