export interface Campaign {
  id: string;
  brand: string;
  category: string;
  outcome: string;
  stats: string;
  gradient: string;
  textColor: string;
}

/**
 * EDIT THIS LIST TO UPDATE THE WORK TAB CAMPAIGNS
 */
export const CAMPAIGNS: Campaign[] = [
  {
    id: "zuno",
    brand: "ZUNO",
    category: "Campus Activation",
    outcome: "Driving massive student adoption across key universities.",
    stats: "5,000+ Verified Actions",
    gradient: "from-pink to-purple-600",
    textColor: "text-white"
  },
  {
    id: "gemini",
    brand: "GEMINI",
    category: "Tech Community",
    outcome: "Building the next generation of AI enthusiasts.",
    stats: "1,510 New Members",
    gradient: "from-blue-400 to-lime",
    textColor: "text-black"
  },
  {
    id: "eatsure",
    brand: "EATSURE",
    category: "Food & Beverage",
    outcome: "Taking over campus cravings with targeted activations.",
    stats: "1,500+ Verified Actions",
    gradient: "from-purple-600 to-purple-900",
    textColor: "text-white"
  },
  {
    id: "sunrise",
    brand: "SUNRISE",
    category: "Event Marketing",
    outcome: "Creating high-energy moments for the youth demographic.",
    stats: "1,624 Verified Actions",
    gradient: "from-yellow-400 to-orange-500",
    textColor: "text-black"
  },
  {
    id: "district-app",
    brand: "DISTRICT APP",
    category: "Digital Campaign",
    outcome: "Dominating the social feed with student-led content.",
    stats: "4,000+ Instagram Stories",
    gradient: "from-purple-500 to-pink",
    textColor: "text-white"
  },
  {
    id: "ispl",
    brand: "ISPL",
    category: "Sports Marketing",
    outcome: "Bringing the stadium energy directly to the campus.",
    stats: "300+ Conversions",
    gradient: "from-orange-500 to-red-600",
    textColor: "text-white"
  },
  {
    id: "dell-gaming",
    brand: "DELL GAMING",
    category: "Gaming Events",
    outcome: "Event marketing & influencer management across 9 cities.",
    stats: "750+ Participants",
    gradient: "from-blue-600 to-cyan-400",
    textColor: "text-white"
  },
  {
    id: "asus",
    brand: "ASUS",
    category: "Gaming Events",
    outcome: "Multi-city event marketing and management.",
    stats: "300+ Participants",
    gradient: "from-zinc-900 to-zinc-700",
    textColor: "text-white"
  },
  {
    id: "hp-gaming",
    brand: "HP GAMING",
    category: "Gaming Events",
    outcome: "Connecting with the hardcore collegiate gaming community.",
    stats: "1,200+ Participants",
    gradient: "from-blue-500 to-indigo-600",
    textColor: "text-white"
  }
];
