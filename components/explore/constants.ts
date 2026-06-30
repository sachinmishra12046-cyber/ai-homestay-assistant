import { ApiStay, Stay } from "./types";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const CATEGORIES = [
  { label: "All", emoji: "✨", value: "All" },
  { label: "Mountain", emoji: "🏔", value: "Mountain" },
  { label: "Beach", emoji: "🏖", value: "Beach" },
  { label: "Forest", emoji: "🌲", value: "Forest" },
  { label: "Desert", emoji: "🏜", value: "Desert" },
];

export const AMENITY_OPTIONS = [
  { id: "wifi", label: "Wifi" },
  { id: "parking", label: "Parking" },
  { id: "breakfast", label: "Breakfast" },
];

const STAY_IMAGES: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
  2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  3: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  4: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80",
  5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  6: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
  7: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  8: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
};

const CATEGORY_IMAGES: Record<string, string> = {
  Mountain:
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
  Beach:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  Forest:
    "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80",
  Desert:
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
};

export function enrichStay(stay: ApiStay): Stay {
  return {
    ...stay,
    image:
      STAY_IMAGES[stay.id] ||
      CATEGORY_IMAGES[stay.category] ||
      STAY_IMAGES[1],
    tags: [stay.category, stay.available ? "Available" : "Limited"],
  };
}
