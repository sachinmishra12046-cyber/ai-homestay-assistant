export const APP_NAME = "StayNest";
export const STORAGE_KEYS = {
  theme: "staynest-theme",
  wishlist: "staynest-wishlist",
  recentlyViewed: "staynest-recently-viewed",
  userProfile: "staynest-user-profile",
  settings: "staynest-settings",
  auth: "staynest-auth",
} as const;

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
