export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const MOCK_RESPONSES: Record<string, string> = {
  mountain:
    "Based on your preferences, I recommend Himalayan Pine Retreat in Manali (₹2,499/night) and Kasol Wooden Chalet (₹3,800/night). Both are eco-friendly with excellent ratings.",
  honeymoon:
    "For a romantic getaway, try Kerala Backwater Home in Alleppey or Tea Garden Eco Bungalow in Munnar. Both offer peaceful settings perfect for couples.",
  delhi:
    "Great weekend options from Delhi: Rishikesh riverside stays (2–3 hrs), Mussoorie mountain cottages, and Kasol adventure chalets. Want me to filter by budget?",
  family:
    "Family-friendly picks with parking & breakfast: Coorg Coffee Estate, Munnar Tea Garden Villa, and Himalayan Pine Retreat. All have 4.7+ ratings.",
  pet: "Pet-friendly cottages near forests and lakes are available in Coorg and Wayanad. I can show stays with large outdoor spaces and host-approved pet policies.",
  default:
    "I'd love to help you find the perfect stay! Tell me your destination, budget, travel dates, or preferences (mountain, beach, family, couple) and I'll recommend the best eco-homestays.",
};

export function getMockAiResponse(input: string): string {
  const query = input.toLowerCase();

  if (query.includes("mountain") || query.includes("3000") || query.includes("₹3000"))
    return MOCK_RESPONSES.mountain;
  if (query.includes("honeymoon") || query.includes("couple"))
    return MOCK_RESPONSES.honeymoon;
  if (query.includes("delhi") || query.includes("weekend"))
    return MOCK_RESPONSES.delhi;
  if (query.includes("family") || query.includes("parking"))
    return MOCK_RESPONSES.family;
  if (query.includes("pet"))
    return MOCK_RESPONSES.pet;

  return MOCK_RESPONSES.default;
}

export const SUGGESTED_PROMPTS = [
  "Find me mountain stays under ₹3000",
  "Suggest honeymoon stays",
  "Weekend trip from Delhi",
  "Family stay with parking",
  "Pet friendly cottages",
];

export function getAiRecommendationReasons(stay: {
  rating: number;
  price: number;
  category: string;
  amenities: string[];
}): string[] {
  const reasons: string[] = [];

  if (stay.rating >= 4.8) reasons.push("Excellent Rating");
  if (stay.price <= 2500) reasons.push("Budget Friendly");
  if (stay.price >= 4000) reasons.push("Luxury Experience");
  if (stay.amenities.includes("breakfast")) reasons.push("Breakfast Included");
  if (["Mountain", "Forest"].includes(stay.category)) reasons.push("Scenic View");
  if (stay.category === "Beach") reasons.push("Perfect for Couples");
  if (stay.amenities.includes("parking")) reasons.push("Parking Available");
  if (reasons.length === 0) reasons.push("Peaceful Location");

  return reasons.slice(0, 3);
}
