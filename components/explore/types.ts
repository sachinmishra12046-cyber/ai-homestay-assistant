export interface ApiStay {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  amenities: string[];
  available: boolean;
}

export interface Stay extends ApiStay {
  image: string;
  tags: string[];
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  minRating: number;
  location: string;
  category: string;
  amenities: string[];
  availableOnly: boolean;
  propertyType: string;
  guestCapacity: number;
}

export type SortOption = "rating" | "price_low" | "price_high" | "newest";

export const DEFAULT_FILTERS: FilterState = {
  minPrice: 1000,
  maxPrice: 5000,
  minRating: 0,
  location: "",
  category: "All",
  amenities: [],
  availableOnly: false,
  propertyType: "All",
  guestCapacity: 1,
};

export const PRICE_MIN = 1000;
export const PRICE_MAX = 5000;
