export interface LeaderboardEntry {
  id: string;
  name: string;
  earned: string;
  rank: number;
  avatar?: string;
}

// EDIT THIS ARRAY TO UPDATE THE LEADERBOARD
// Format: { id: "unique-id", name: "NAME", earned: "AMOUNT", rank: 1 }
export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { id: "1", name: "Aryan K.", earned: "₹45,000", rank: 1 },
  { id: "2", name: "Sanya M.", earned: "₹38,500", rank: 2 },
  { id: "3", name: "Ishaan S.", earned: "₹32,000", rank: 3 },
  { id: "4", name: "Riya V.", earned: "₹29,000", rank: 4 },
  { id: "5", name: "Kabir J.", earned: "₹25,500", rank: 5 },
  { id: "6", name: "Ananya P.", earned: "₹22,000", rank: 6 },
  { id: "7", name: "Dev R.", earned: "₹19,500", rank: 7 },
  { id: "8", name: "Mehak G.", earned: "₹18,000", rank: 8 },
  { id: "9", name: "Arjun B.", earned: "₹15,000", rank: 9 },
  { id: "10", name: "Zoya H.", earned: "₹12,500", rank: 10 },
];
