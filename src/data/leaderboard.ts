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
  "Navya - 97000 delhi",
  "Kaustav - 30,000rs",
  "Sahil - 17500 approx pune",
  "Ganesh - 16700 mumbai",
  "Harsh Modi - 15000rs Mumbai",
  "Harsh & Sid - 14400rs Delhi",
  "Sairaj - 12260rs pune",
  "Achal - 11000 mumbai",
  "Smit 10745 ahemdabad",
  "Rishi Chopda - 7700rs ahemdabad",
  "Rajas- 7050 mumbai",
  "Devansh - 6700 Pune",
  "Shivam - 6700 Gwalior",
  "Kishan - 6121rs Vadodara",
  "Dharshini - 6100rs chennai",
  "Shreyas - 5600 bangalore",
  "Divyanshi - 5000 delhi",
  "Rejolin - 4938rs chennai",
  "Bhaskar - 4000 Hyderabad",
  "Prateek - 4000rs Lucknow",
  "Aman - 3700 kohlapur",
  "Abu talha - 2860 delhi",
  "Gautham - 2800rs Vizag",
  "Rahul - 1900 pune",
  "Mritikka 1600 assam",
  "Praveen - 1150rs coimbatore",
  "Karnav - 1000rs ludhiana",
  "Prabhas - 5000 telangana"
];

const parseEntry = (entry: string) => {
  // Try to match the pattern: Name - Amount [Currency] Location
  // Also handles cases without hyphens like "Smit 10745 ahemdabad"
  const match = entry.match(/([a-zA-Z\s&]+?)\s*(?:-\s*)?([\d,]+(?:K|rs)?)\s*(?:approx\s*)?([a-zA-Z\s]*)/i);
  
  if (match) {
    const name = match[1].trim();
    let amountStr = match[2].trim().toLowerCase();
    const location = match[3].trim();
    
    // Convert K to thousands
    let numericValue = 0;
    if (amountStr.endsWith('k')) {
      numericValue = parseFloat(amountStr.replace('k', '')) * 1000;
    } else {
      numericValue = parseInt(amountStr.replace(/[^0-9]/g, ''), 10);
    }

    // Format amount nicely (e.g., 1,67,720)
    const formattedAmount = numericValue.toLocaleString('en-IN');

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
