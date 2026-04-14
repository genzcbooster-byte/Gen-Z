export interface LeaderboardEntry {
  id: string;
  name: string;
  earned: string;
  rank: number;
  location?: string;
}

/**
 * EDIT THIS LIST TO UPDATE THE LEADERBOARD
 * Format: "Name - Amount Location"
 * The list is automatically sorted by rank based on the order here.
 */
const RAW_LIST = [
  "Surya - 1,67,720rs delhi",
  "Navya - 91000 delhi",
  "Kaustav - 30,000rs",
  "Sahil - 17500 approx pune",
  "Ganesh - 16700 mumbai",
  "Harsh Modi - 15000rs Mumbai",
  "Harsh & Sid - 14400rs Delhi",
  "Sairaj - 12260rs pune",
  "Achal - 11000 mumbai",
  "Smit - 10745 ahemdabad",
  "Rishi Chopda - 7700rs ahemdabad",
  "Rajas - 7050 mumbai",
  "Devansh - 6700 Pune",
  "Shivam - 6700 Gwalior",
  "Kishan - 6121rs Vadodara",
  "Dharshini - 6100rs chennai",
  "Shreyas - 5600 bangalore",
  "Divyanshi - 5K delhi",
  "Rejolin - 4938rs chennai",
  "Bhaskar - 4K Hyderabad",
  "Prateek - 4000rs Lucknow",
  "Aman - 3700 kohlapur",
  "Abu talha - 2860 delhi",
  "Gautham - 2800rs Vizag",
  "Rahul - 1900 pune",
  "Mritikka - 1600 assam",
  "Praveen - 1150rs coimbatore",
  "Karnav - 1000rs ludhiana",
  "Prabhas - 500 telangana",
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = RAW_LIST.map((line, index) => {
  const [namePart, restPart] = line.split(" - ");
  const name = namePart.trim();
  const rest = (restPart || "").trim();
  
  // Extract amount (first number-like sequence)
  const amountMatch = rest.match(/[\d,]+K?|[\d,]+/);
  const amountStr = amountMatch ? amountMatch[0] : "0";
  
  // Format amount for display
  const earned = `₹${amountStr}${amountStr.includes('K') ? '' : ''}`;
  
  // Extract location (everything after the amount)
  let location = rest.replace(amountStr, "").replace(/rs|approx/gi, "").trim();
  if (location) {
    location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
  }

  return {
    id: String(index + 1),
    name,
    earned,
    rank: index + 1,
    location: location || undefined
  };
});
