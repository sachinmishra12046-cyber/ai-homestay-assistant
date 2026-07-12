"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, X, Search, MapPin, Star, Heart, Wifi, Car, Coffee, Mountain, Waves, TreePine, Gem, DollarSign, Leaf, Zap, Shield, Award, Map, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const demoProperties = [
  {
    id: "1",
    title: "Himalayan Pine Retreat",
    description: "Wake up to stunning mountain views in this cozy wooden cabin surrounded by pine forests. Perfect for nature lovers and peace seekers.",
    price: 2500,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"],
    location: "Manali",
    category: "Mountain",
    amenities: ["WiFi", "Parking", "Kitchen", "Heating"],
    isSuperhost: true,
    isInstantBook: true,
    aiMatch: 92,
    ecoScore: 85,
    latitude: 32.24,
    longitude: 77.19,
    aiTags: ["peaceful", "nature", "trekking", "romantic"],
    host: { name: "Rajesh Kumar", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 0,
    distance: 0
  },
  {
    id: "2",
    title: "Coastal Bamboo Villa",
    description: "A beautiful bamboo villa just steps from the beach. Enjoy the sound of waves and stunning sunsets from your private terrace.",
    price: 3500,
    rating: 4.8,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"],
    location: "Goa",
    category: "Beach",
    amenities: ["WiFi", "AC", "Pool", "Beach Access"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 88,
    ecoScore: 72,
    latitude: 15.60,
    longitude: 73.76,
    aiTags: ["beach", "relax", "sunset", "romantic"],
    host: { name: "Priya Singh", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 10,
    distance: 0
  },
  {
    id: "3",
    title: "Riverside Yoga Cottage",
    description: "Find inner peace at this serene cottage by the Ganges. Includes daily yoga sessions and meditation spaces.",
    price: 1800,
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop"],
    location: "Rishikesh",
    category: "Wellness",
    amenities: ["WiFi", "Yoga Studio", "Garden", "Kitchen"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 85,
    ecoScore: 90,
    latitude: 30.12,
    longitude: 78.31,
    aiTags: ["yoga", "meditation", "spiritual", "peaceful"],
    host: { name: "Anita Sharma", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: true },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 0,
    distance: 0
  },
  {
    id: "4",
    title: "Coffee Plantation Estate",
    description: "Stay amidst lush coffee plantations in this colonial-style estate. Experience authentic Coorg coffee culture.",
    price: 4200,
    rating: 4.9,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&h=600&fit=crop"],
    location: "Coorg",
    category: "Eco",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant"],
    isSuperhost: true,
    isInstantBook: true,
    aiMatch: 90,
    ecoScore: 88,
    latitude: 12.42,
    longitude: 75.74,
    aiTags: ["coffee", "plantation", "nature", "luxury"],
    host: { name: "Vikram Reddy", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    discount: 15,
    distance: 0
  },
  {
    id: "5",
    title: "Lake View Palace",
    description: "Experience royal living in this heritage palace overlooking Lake Pichola. Traditional Rajasthani hospitality at its finest.",
    price: 8000,
    rating: 4.95,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"],
    location: "Udaipur",
    category: "Luxury",
    amenities: ["WiFi", "AC", "Pool", "Restaurant", "Spa"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 95,
    ecoScore: 68,
    latitude: 24.58,
    longitude: 73.68,
    aiTags: ["palace", "lake", "royal", "romantic"],
    host: { name: "Mahendra Singh", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    discount: 0,
    distance: 0
  },
  {
    id: "6",
    title: "Hippie Haven",
    description: "A colorful, bohemian-style cottage in the heart of Kasol. Perfect for backpackers and free spirits.",
    price: 1200,
    rating: 4.6,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop"],
    location: "Kasol",
    category: "Budget",
    amenities: ["WiFi", "Kitchen", "Garden"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 78,
    ecoScore: 82,
    latitude: 31.98,
    longitude: 77.25,
    aiTags: ["backpacking", "hippie", "budget", "nature"],
    host: { name: "Rahul Verma", photo: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop", verified: false },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 5,
    distance: 0
  },
  {
    id: "7",
    title: "Tea Garden Bungalow",
    description: "Wake up to endless tea plantations in this charming bungalow. Perfect for a peaceful getaway in God's Own Country.",
    price: 3200,
    rating: 4.8,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop"],
    location: "Munnar",
    category: "Mountain",
    amenities: ["WiFi", "Fireplace", "Garden", "Kitchen"],
    isSuperhost: true,
    isInstantBook: true,
    aiMatch: 87,
    ecoScore: 84,
    latitude: 10.09,
    longitude: 77.06,
    aiTags: ["tea", "gardens", "family", "peaceful"],
    host: { name: "Suresh Nair", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 0,
    distance: 0
  },
  {
    id: "8",
    title: "Nilgiri Mountain Lodge",
    description: "A colonial-era lodge with stunning views of the Nilgiri hills. Experience the charm of Ooty's colonial past.",
    price: 3800,
    rating: 4.7,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop"],
    location: "Ooty",
    category: "Mountain",
    amenities: ["WiFi", "Fireplace", "Restaurant", "Garden"],
    isSuperhost: false,
    isInstantBook: false,
    aiMatch: 82,
    ecoScore: 80,
    latitude: 11.41,
    longitude: 76.69,
    aiTags: ["colonial", "heritage", "mountains", "family"],
    host: { name: "Venkat Iyer", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop", verified: true },
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    discount: 8,
    distance: 0
  },
  {
    id: "9",
    title: "Apple Orchard Cottage",
    description: "Stay amidst apple orchards with panoramic mountain views. Fresh apples and warm hospitality included.",
    price: 2800,
    rating: 4.85,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"],
    location: "Shimla",
    category: "Mountain",
    amenities: ["WiFi", "Heating", "Kitchen", "Garden"],
    isSuperhost: true,
    isInstantBook: true,
    aiMatch: 89,
    ecoScore: 76,
    latitude: 31.10,
    longitude: 77.17,
    aiTags: ["orchard", "mountains", "family", "romantic"],
    host: { name: "Meera Sharma", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 12,
    distance: 0
  },
  {
    id: "10",
    title: "Lakefront Villa",
    description: "A beautiful villa right on the shores of Naini Lake. Wake up to stunning lake views every morning.",
    price: 4500,
    rating: 4.9,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop"],
    location: "Nainital",
    category: "Luxury",
    amenities: ["WiFi", "AC", "Lake View", "Kitchen"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 91,
    ecoScore: 75,
    latitude: 29.39,
    longitude: 79.46,
    aiTags: ["lake", "family", "romantic", "weekend"],
    host: { name: "Amit Joshi", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop", verified: true },
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    discount: 0,
    distance: 0
  },
  {
    id: "11",
    title: "Beach Hut Paradise",
    description: "Simple yet charming beach huts just meters from the sand. Perfect for surfers and beach lovers.",
    price: 1500,
    rating: 4.5,
    reviewCount: 267,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"],
    location: "Goa",
    category: "Budget",
    amenities: ["WiFi", "Beach Access", "Restaurant"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 75,
    ecoScore: 85,
    latitude: 15.60,
    longitude: 73.76,
    aiTags: ["beach", "surfing", "budget", "relax"],
    host: { name: "Carlos D'Souza", photo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop", verified: false },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 0,
    distance: 0
  },
  {
    id: "12",
    title: "Forest Treehouse",
    description: "An actual treehouse nestled in the Western Ghats. Unique experience for adventure seekers.",
    price: 2200,
    rating: 4.8,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop"],
    location: "Coorg",
    category: "Adventure",
    amenities: ["WiFi", "Kitchen", "Nature Trail"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 93,
    ecoScore: 91,
    latitude: 12.42,
    longitude: 75.74,
    aiTags: ["treehouse", "unique", "adventure", "nature"],
    host: { name: "Arjun Gowda", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 0,
    distance: 0
  },
  {
    id: "13",
    title: "Desert Camp Luxury",
    description: "Glamping in the Thar Desert with all modern amenities. Stargazing and cultural experiences included.",
    price: 5500,
    rating: 4.85,
    reviewCount: 134,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"],
    location: "Jaisalmer",
    category: "Luxury",
    amenities: ["WiFi", "AC", "Restaurant", "Cultural Programs"],
    isSuperhost: true,
    isInstantBook: true,
    aiMatch: 86,
    ecoScore: 75,
    latitude: 26.91,
    longitude: 70.91,
    aiTags: ["desert", "stargazing", "culture", "glamping"],
    host: { name: "Rajasthan Tours", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 20,
    distance: 0
  },
  {
    id: "14",
    title: "Backwater Houseboat",
    description: "Traditional Kerala houseboat experience. Cruise through the backwaters in luxury and comfort.",
    price: 6000,
    rating: 4.9,
    reviewCount: 245,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop"],
    location: "Alleppey",
    category: "Luxury",
    amenities: ["WiFi", "AC", "Kitchen", "Crew"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 94,
    ecoScore: 82,
    latitude: 9.50,
    longitude: 76.34,
    aiTags: ["backwaters", "houseboat", "luxury", "unique"],
    host: { name: "Kerala Backwaters", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 0,
    distance: 0
  },
  {
    id: "15",
    title: "Valley of Flowers Hut",
    description: "Basic mountain hut near the Valley of Flowers. Perfect for trekkers and nature photographers.",
    price: 1000,
    rating: 4.4,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"],
    location: "Uttarakhand",
    category: "Budget",
    amenities: ["Kitchen", "Guide Available"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 72,
    ecoScore: 92,
    latitude: 30.73,
    longitude: 79.60,
    aiTags: ["trekking", "flowers", "nature", "budget"],
    host: { name: "Mountain Guides", photo: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop", verified: true },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 0,
    distance: 0
  },
  {
    id: "16",
    title: "Heritage Haveli",
    description: "200-year-old restored haveli in the heart of the Pink City. Experience royal Rajasthani living.",
    price: 4800,
    rating: 4.9,
    reviewCount: 167,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop"],
    location: "Jaipur",
    category: "Heritage",
    amenities: ["WiFi", "AC", "Restaurant", "Courtyard"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 88,
    ecoScore: 71,
    latitude: 26.91,
    longitude: 75.79,
    aiTags: ["haveli", "heritage", "royal", "culture"],
    host: { name: "Rajasthan Heritage", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop", verified: true },
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    discount: 0,
    distance: 0
  },
  {
    id: "17",
    title: "Sunset Point Villa",
    description: "Perfect sunset views from every room. Modern amenities with traditional Kullu architecture.",
    price: 3000,
    rating: 4.75,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"],
    location: "Kullu",
    category: "Mountain",
    amenities: ["WiFi", "Heating", "Kitchen", "Terrace"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 84,
    ecoScore: 77,
    latitude: 31.96,
    longitude: 77.10,
    aiTags: ["sunset", "mountains", "romantic", "views"],
    host: { name: "Kullu Stays", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 10,
    distance: 0
  },
  {
    id: "18",
    title: "Surfer's Den",
    description: "The perfect spot for surfers in India. Located right at one of the best surf breaks in the country.",
    price: 1800,
    rating: 4.6,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"],
    location: "Goa",
    category: "Beach",
    amenities: ["WiFi", "Surf Equipment", "Restaurant"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 80,
    ecoScore: 83,
    latitude: 15.60,
    longitude: 73.76,
    aiTags: ["surfing", "beach", "adventure", "water"],
    host: { name: "Surf India", photo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop", verified: true },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 0,
    distance: 0
  },
  {
    id: "19",
    title: "Spice Garden Homestay",
    description: "Stay in a working spice plantation. Learn about spices and enjoy fresh, organic meals.",
    price: 2000,
    rating: 4.7,
    reviewCount: 134,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&h=600&fit=crop"],
    location: "Kerala",
    category: "Eco",
    amenities: ["WiFi", "Kitchen", "Garden", "Spice Tours"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 86,
    ecoScore: 89,
    latitude: 9.54,
    longitude: 77.17,
    aiTags: ["spices", "organic", "cooking", "authentic"],
    host: { name: "Green Kerala", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 0,
    distance: 0
  },
  {
    id: "20",
    title: "Monastery View Room",
    description: "Peaceful room with views of ancient monasteries. Experience Tibetan culture and spirituality.",
    price: 1400,
    rating: 4.65,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop"],
    location: "Dharamshala",
    category: "Wellness",
    amenities: ["WiFi", "Heating", "Kitchen", "Meditation Space"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 83,
    ecoScore: 88,
    latitude: 32.24,
    longitude: 76.32,
    aiTags: ["monastery", "spiritual", "peaceful", "culture"],
    host: { name: "Tibetan Retreat", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: true },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 0,
    distance: 0
  },
  {
    id: "21",
    title: "Auli Ski Resort",
    description: "Premium ski resort with stunning Himalayan views. Perfect for winter sports enthusiasts.",
    price: 6500,
    rating: 4.8,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"],
    location: "Auli",
    category: "Luxury",
    amenities: ["WiFi", "Heating", "Restaurant", "Ski Equipment"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 90,
    ecoScore: 72,
    latitude: 30.54,
    longitude: 79.26,
    aiTags: ["ski", "snow", "adventure", "luxury"],
    host: { name: "Himalayan Adventures", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 25,
    distance: 0
  },
  {
    id: "22",
    title: "Darjeeling Tea Estate",
    description: "Colonial bungalow on a working tea estate with views of Kanchenjunga.",
    price: 3800,
    rating: 4.85,
    reviewCount: 167,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop"],
    location: "Darjeeling",
    category: "Heritage",
    amenities: ["WiFi", "Fireplace", "Garden", "Tea Tours"],
    isSuperhost: true,
    isInstantBook: true,
    aiMatch: 89,
    ecoScore: 86,
    latitude: 27.05,
    longitude: 88.26,
    aiTags: ["tea", "heritage", "mountains", "colonial"],
    host: { name: "Darjeeling Heritage", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    discount: 0,
    distance: 0
  },
  {
    id: "23",
    title: "Leh Ladakh Camp",
    description: "Luxury tents in the heart of Ladakh with stunning mountain vistas and clear night skies.",
    price: 4200,
    rating: 4.75,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"],
    location: "Leh",
    category: "Adventure",
    amenities: ["WiFi", "Heating", "Restaurant", "Bonfire"],
    isSuperhost: true,
    isInstantBook: true,
    aiMatch: 91,
    ecoScore: 78,
    latitude: 34.15,
    longitude: 77.58,
    aiTags: ["ladakh", "mountains", "adventure", "stargazing"],
    host: { name: "Ladakh Expeditions", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 15,
    distance: 0
  },
  {
    id: "24",
    title: "Spiti Valley Homestay",
    description: "Traditional Spiti home with warm hospitality and breathtaking valley views.",
    price: 1800,
    rating: 4.6,
    reviewCount: 134,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"],
    location: "Spiti",
    category: "Budget",
    amenities: ["WiFi", "Kitchen", "Heating", "Guide Available"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 79,
    ecoScore: 87,
    latitude: 32.11,
    longitude: 78.44,
    aiTags: ["spiti", "valley", "adventure", "authentic"],
    host: { name: "Spiti Valley Stay", photo: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop", verified: true },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 0,
    distance: 0
  },
  {
    id: "25",
    title: "Mussoorie Cloud Villa",
    description: "Elegant villa above the clouds with panoramic Himalayan views.",
    price: 5200,
    rating: 4.9,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop"],
    location: "Mussoorie",
    category: "Luxury",
    amenities: ["WiFi", "AC", "Pool", "Restaurant"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 93,
    ecoScore: 74,
    latitude: 30.46,
    longitude: 78.08,
    aiTags: ["clouds", "luxury", "romantic", "views"],
    host: { name: "Queen of Hills Stay", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: true },
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    discount: 0,
    distance: 0
  },
  {
    id: "26",
    title: "Rishikesh Riverside Camp",
    description: "Luxury camping by the Ganges with rafting and yoga experiences.",
    price: 2500,
    rating: 4.7,
    reviewCount: 256,
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop"],
    location: "Rishikesh",
    category: "Adventure",
    amenities: ["WiFi", "Rafting", "Bonfire", "Kitchen"],
    isSuperhost: true,
    isInstantBook: true,
    aiMatch: 87,
    ecoScore: 83,
    latitude: 30.12,
    longitude: 78.31,
    aiTags: ["rafting", "camping", "adventure", "river"],
    host: { name: "Adventure Camps", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", verified: true },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 10,
    distance: 0
  },
  {
    id: "27",
    title: "Goa Portuguese Villa",
    description: "Beautiful Portuguese-style villa with private pool and garden.",
    price: 7500,
    rating: 4.95,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"],
    location: "Goa",
    category: "Luxury",
    amenities: ["WiFi", "AC", "Pool", "Garden"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 94,
    ecoScore: 70,
    latitude: 15.60,
    longitude: 73.76,
    aiTags: ["portuguese", "luxury", "pool", "family"],
    host: { name: "Goa Luxury Stays", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop", verified: true },
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    discount: 0,
    distance: 0
  },
  {
    id: "28",
    title: "Coorg Spice Cottage",
    description: "Cozy cottage surrounded by spice plantations and coffee estates.",
    price: 2400,
    rating: 4.75,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&h=600&fit=crop"],
    location: "Coorg",
    category: "Eco",
    amenities: ["WiFi", "Kitchen", "Garden", "Spice Tours"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 84,
    ecoScore: 90,
    latitude: 12.42,
    longitude: 75.74,
    aiTags: ["spice", "eco", "nature", "peaceful"],
    host: { name: "Coorg Eco Stay", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: true },
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    discount: 5,
    distance: 0
  },
  {
    id: "29",
    title: "Manali Riverside Camp",
    description: "Glamping by the Beas River with mountain views and bonfire nights.",
    price: 2200,
    rating: 4.65,
    reviewCount: 212,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"],
    location: "Manali",
    category: "Camping",
    amenities: ["WiFi", "Bonfire", "Kitchen", "River Access"],
    isSuperhost: false,
    isInstantBook: true,
    aiMatch: 81,
    ecoScore: 84,
    latitude: 32.24,
    longitude: 77.19,
    aiTags: ["camping", "river", "bonfire", "glamping"],
    host: { name: "Manali Camps", photo: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop", verified: true },
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    discount: 0,
    distance: 0
  },
  {
    id: "30",
    title: "Shimla Colonial Bungalow",
    description: "Heritage British-era bungalow with stunning views of the Himalayas.",
    price: 4500,
    rating: 4.85,
    reviewCount: 167,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop"],
    location: "Shimla",
    category: "Heritage",
    amenities: ["WiFi", "Fireplace", "Garden", "Restaurant"],
    isSuperhost: true,
    isInstantBook: false,
    aiMatch: 88,
    ecoScore: 73,
    latitude: 31.10,
    longitude: 77.17,
    aiTags: ["colonial", "heritage", "mountains", "luxury"],
    host: { name: "Shimla Heritage", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop", verified: true },
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    discount: 0,
    distance: 0
  }
];

const CATEGORIES = ["All", "Mountain", "Beach", "Forest", "Luxury", "Budget", "Eco", "Wellness", "Heritage", "Adventure", "Camping", "Cabins", "Farm Stay", "Tree House", "River Side", "Glamping", "Tiny House"];

const categoryIcons = {
  All: MapPin,
  Mountain: Mountain,
  Beach: Waves,
  Forest: TreePine,
  Luxury: Gem,
  Budget: DollarSign,
  Eco: Leaf,
  Wellness: Sparkles,
  Heritage: Award,
  Adventure: Zap,
  Camping: Coffee,
  Cabins: Mountain,
  "Farm Stay": TreePine,
  "Tree House": TreePine,
  "River Side": Waves,
  Glamping: Sparkles,
  "Tiny House": Gem,
};

const amenityIcons = {
  "WiFi": Wifi,
  "Parking": Car,
  "Kitchen": Coffee,
};

interface Stay {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  location: string;
  category: string;
  amenities: string[];
  isSuperhost: boolean;
  isInstantBook: boolean;
  aiMatch?: number;
  ecoScore?: number;
  latitude?: number;
  longitude?: number;
  aiTags?: string[];
  host: { name: string; photo: string; verified: boolean };
  bedrooms: number;
  bathrooms: number;
  guests: number;
  discount: number;
  distance: number;
}

function filterAndSortStays(
  stays: Stay[],
  search: string,
  activeCategory: string,
  filters: {
    priceRange: [number, number];
    guests: number;
    bedrooms: number;
    bathrooms: number;
    selectedAmenities: string[];
    minRating: number;
    minEcoScore: number;
    superhostOnly: boolean;
    instantBookOnly: boolean;
  },
  sortBy: string
): Stay[] {
  const query = search.toLowerCase().trim();

  // AI Natural Language Parsing - only apply when there's a search query
  const parseNaturalLanguage = (query: string, stay: Stay): boolean => {
    // Price filters
    const priceMatch = query.match(/under\s*₹?(\d+)/i);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : null;
    if (maxPrice && stay.price > maxPrice) return false;

    const minPriceMatch = query.match(/above\s*₹?(\d+)/i);
    const minPrice = minPriceMatch ? parseInt(minPriceMatch[1]) : null;
    if (minPrice && stay.price < minPrice) return false;

    // Group size filters
    const groupMatch = query.match(/(\d+)\s*(guests?|people?|persons?)/i);
    const groupSize = groupMatch ? parseInt(groupMatch[1]) : null;
    if (groupSize && stay.guests < groupSize) return false;

    const familyMatch = query.match(/family/i);
    if (familyMatch && stay.guests < 4) return false;

    // Category/Type filters
    const categoryKeywords: Record<string, string[]> = {
      mountain: ['mountain', 'cabin', 'peak', 'hill', 'valley'],
      beach: ['beach', 'coastal', 'sea', 'ocean', 'shore', 'coast'],
      forest: ['forest', 'jungle', 'nature', 'tree', 'wildlife', 'woods'],
      luxury: ['luxury', 'palace', 'villa', 'premium', 'royal', '5-star', '5 star'],
      budget: ['budget', 'cheap', 'affordable', 'economy', 'low-cost', 'low cost'],
      eco: ['eco', 'sustainable', 'organic', 'green', 'environmental', 'eco-friendly'],
      wellness: ['yoga', 'meditation', 'spa', 'wellness', 'spiritual', 'retreat'],
      heritage: ['heritage', 'haveli', 'historic', 'colonial', 'traditional', 'ancient'],
      adventure: ['adventure', 'trekking', 'hiking', 'unique', 'treehouse', 'thrill'],
      camping: ['camp', 'camping', 'tent', 'glamping', 'outdoor'],
      cabins: ['cabin', 'cottage', 'chalet', 'log'],
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        if (stay.category !== category && !stay.aiTags?.some(tag => keywords.includes(tag))) {
          return false;
        }
      }
    }

    // Amenity filters
    const amenityKeywords: Record<string, string> = {
      'wifi': 'wifi',
      'pool': 'pool',
      'kitchen': 'kitchen',
      'parking': 'parking',
      'ac': 'ac',
      'garden': 'garden',
      'fireplace': 'fireplace',
      'spa': 'spa',
      'heating': 'heating',
      'breakfast': 'breakfast',
    };

    for (const [keyword, amenity] of Object.entries(amenityKeywords)) {
      if (query.includes(keyword) && !stay.amenities.some(a => a.toLowerCase().includes(amenity))) {
        return false;
      }
    }

    // Vibe/Experience filters
    const vibeKeywords = ['peaceful', 'romantic', 'family', 'solo', 'honeymoon', 'weekend', 'workcation', 'remote', 'work'];
    for (const vibe of vibeKeywords) {
      if (query.includes(vibe) && !stay.aiTags?.includes(vibe)) {
        return false;
      }
    }

    // Eco score filter
    const ecoMatch = query.match(/eco\s*(score|rating)?\s*(above|over|greater than)?\s*(\d+)/i);
    if (ecoMatch) {
      const minEco = parseInt(ecoMatch[3]);
      if ((!stay.ecoScore || stay.ecoScore < minEco)) return false;
    }

    // Location filters
    const locations = ['manali', 'goa', 'rishikesh', 'coorg', 'udaipur', 'jaipur', 'shimla', 'munnar', 'ooty', 'leh', 'spiti', 'kasol', 'dharamshala', 'mussoorie', 'nainital', 'jaisalmer', 'alleppey', 'darjeeling', 'auli', 'kerala'];
    for (const loc of locations) {
      if (query.includes(loc) && !stay.location.toLowerCase().includes(loc)) {
        return false;
      }
    }

    return true;
  };

  return stays.filter((stay) => {
    // Category filter - always apply
    const matchCategory =
      activeCategory === "All" || stay.category === activeCategory;

    // Search filter - only apply when there's a query
    const matchSearch =
      !query ||
      stay.title.toLowerCase().includes(query) ||
      stay.location.toLowerCase().includes(query) ||
      stay.description.toLowerCase().includes(query) ||
      parseNaturalLanguage(query, stay);

    // Price range filter
    const matchPrice = stay.price >= filters.priceRange[0] && stay.price <= filters.priceRange[1];

    // Guests filter
    const matchGuests = filters.guests === 0 || stay.guests >= filters.guests;

    // Bedrooms filter
    const matchBedrooms = filters.bedrooms === 0 || stay.bedrooms >= filters.bedrooms;

    // Bathrooms filter
    const matchBathrooms = filters.bathrooms === 0 || stay.bathrooms >= filters.bathrooms;

    // Amenities filter
    const matchAmenities = filters.selectedAmenities.length === 0 || 
      filters.selectedAmenities.every(amenity => 
        stay.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
      );

    // Rating filter
    const matchRating = filters.minRating === 0 || stay.rating >= filters.minRating;

    // Eco score filter
    const matchEcoScore = filters.minEcoScore === 0 || (stay.ecoScore && stay.ecoScore >= filters.minEcoScore);

    // Superhost filter
    const matchSuperhost = !filters.superhostOnly || stay.isSuperhost;

    // Instant book filter
    const matchInstantBook = !filters.instantBookOnly || stay.isInstantBook;

    return matchCategory && matchSearch && matchPrice && matchGuests && matchBedrooms && matchBathrooms && matchAmenities && matchRating && matchEcoScore && matchSuperhost && matchInstantBook;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'ai-recommended':
        return (b.aiMatch || 0) - (a.aiMatch || 0);
      case 'highest-rated':
        return b.rating - a.rating;
      case 'lowest-price':
        return a.price - b.price;
      case 'highest-price':
        return b.price - a.price;
      case 'eco-score':
        return (b.ecoScore || 0) - (a.ecoScore || 0);
      case 'most-reviewed':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });
}

function PropertyCard({ property, isWishlisted, onToggleWishlist }: { property: Stay; isWishlisted: boolean; onToggleWishlist: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  return (
    <Link href={`/property/${property.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gray-200">
          {/* Image Carousel */}
          <div className="relative h-72">
            <img
              src={property.images[currentImageIndex] || property.image}
              alt={property.title}
              className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {property.images && property.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : property.images.length - 1));
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 p-1 shadow-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex((prev) => (prev < property.images.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 p-1 shadow-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                  {property.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        idx === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Badges */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist();
            }}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 p-2 shadow-md transition-all hover:scale-110"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
          {property.isSuperhost && (
            <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-md flex items-center gap-1">
              <Award className="h-3 w-3 text-emerald-600" />
              Superhost
            </div>
          )}
          {property.isInstantBook && (
            <div className="absolute left-3 bottom-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-md flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Instant Book
            </div>
          )}
          {property.aiMatch && (
            <div className="absolute right-3 bottom-3 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-md flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {property.aiMatch}% Match
            </div>
          )}
          {property.ecoScore && property.ecoScore >= 80 && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-md flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              Eco {property.ecoScore}
            </div>
          )}
        </div>
        <div className="mt-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                {property.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{property.location}</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{property.rating}</span>
                </div>
                <span className="text-sm text-gray-500">·</span>
                <span className="text-sm text-gray-500">{property.reviewCount} reviews</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{property.bedrooms} bed</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">·</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{property.bathrooms} bath</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">·</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{property.guests} guests</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {property.amenities.slice(0, 4).map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              {/* Host Info */}
              <div className="mt-3 flex items-center gap-2">
                <div className="relative">
                  <img
                    src={property.host.photo}
                    alt={property.host.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  {property.host.verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Hosted by {property.host.name}</span>
              </div>
            </div>
            <div className="text-right">
              {property.discount > 0 && (
                <p className="text-xs text-gray-500 line-through">₹{Math.round(property.price / (1 - property.discount / 100)).toLocaleString()}</p>
              )}
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ₹{property.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">/ night</p>
              {property.discount > 0 && (
                <p className="text-xs font-semibold text-emerald-600">{property.discount}% off</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="animate-pulse"
        >
          <div className="relative h-72 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="mt-3 space-y-2">
            <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SectionHeader({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: typeof Sparkles }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-lg shadow-emerald-500/25">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("ai-recommended");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [guests, setGuests] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [minEcoScore, setMinEcoScore] = useState(0);
  const [superhostOnly, setSuperhostOnly] = useState(false);
  const [instantBookOnly, setInstantBookOnly] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  // Fetch properties from database
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        
        if (response.ok) {
          // API returns { properties: [...], pagination: {...} }
          const properties = data.properties || [];
          
          // Transform API data to match Stay interface
          const transformedStays = properties.map((property: any) => ({
            id: String(property.id),
            title: property.title,
            description: property.description,
            price: property.pricePerNight,
            rating: property.rating || property.averageRating || 0,
            reviewCount: property._count?.reviews || 0,
            image: property.images?.[0] || '',
            images: property.images || [],
            location: property.city,
            category: property.category,
            amenities: property.amenities || [],
            isSuperhost: property.isSuperhost || false,
            isInstantBook: property.isInstantBook || false,
            aiMatch: Math.floor(Math.random() * 20) + 80, // Mock AI match score
            ecoScore: property.ecoScore || 0,
            latitude: property.latitude || 0,
            longitude: property.longitude || 0,
            aiTags: property.aiTags || [],
            host: { 
              name: property.host?.name || 'Host', 
              photo: property.host?.avatar || '', 
              verified: true 
            },
            bedrooms: property.bedrooms || 0,
            bathrooms: property.bathrooms || 0,
            guests: property.guests || 0,
            discount: 0,
            distance: 0
          }));
          setStays(transformedStays);
        } else {
          console.error('Failed to fetch properties:', data.error);
          // Fallback to demo properties if API fails
          setStays(demoProperties);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        // Fallback to demo properties if fetch fails
        setStays(demoProperties);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProperties();
  }, []);

  const filteredStays = useMemo(
    () => filterAndSortStays(stays, debouncedSearch, activeCategory, {
      priceRange,
      guests,
      bedrooms,
      bathrooms,
      selectedAmenities,
      minRating,
      minEcoScore,
      superhostOnly,
      instantBookOnly,
    }, sortBy),
    [stays, debouncedSearch, activeCategory, priceRange, guests, bedrooms, bathrooms, selectedAmenities, minRating, minEcoScore, superhostOnly, instantBookOnly, sortBy]
  );

  const trendingStays = useMemo(
    () => [...stays].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6),
    [stays]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const amenityOptions = ["WiFi", "Pool", "Kitchen", "Parking", "AC", "Garden", "Fireplace", "Spa", "Heating", "Breakfast"];

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setGuests(0);
    setBedrooms(0);
    setBathrooms(0);
    setSelectedAmenities([]);
    setMinRating(0);
    setMinEcoScore(0);
    setSuperhostOnly(false);
    setInstantBookOnly(false);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const suggestedPrompts = [
    "Find eco stays near me",
    "Plan a weekend trip",
    "Best honeymoon destinations",
    "Budget-friendly options",
    "Pet friendly stays",
    "Work from home stays",
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your preferences, I'd recommend checking out our eco-friendly stays in Coorg. They have excellent ratings and sustainable practices.",
        "For a weekend getaway, I suggest the Himalayan Pine Retreat in Manali. It's perfect for nature lovers with stunning mountain views.",
        "Looking for budget options? The Hippie Haven in Kasol offers great value at ₹1200/night with a unique bohemian vibe.",
        "For work from home stays, I recommend properties with fast WiFi and dedicated workspaces. The Coffee Plantation Estate in Coorg is a top choice.",
        "Pet-friendly options include several properties in Goa and Coorg that welcome furry companions with open arms.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setChatInput(prompt);
    handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero Section with Premium Design */}
      <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920&h=1080&fit=crop)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Travel
            </motion.div>

            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl tracking-tight">
              Discover India's Finest
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Homestays
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-200 sm:text-2xl max-w-2xl mx-auto">
              AI-powered recommendations for your perfect getaway. From mountains to beaches, find your dream stay.
            </p>
            
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Verified Hosts</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-400" />
                <span>Superhost Stays</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-emerald-400" />
                <span>Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-emerald-400" />
                <span>4.8+ Average Rating</span>
              </div>
            </motion.div>
            
            {/* AI Search Bar */}
            <div className="mt-10 w-full max-w-3xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300" />
                <div className="relative flex items-center bg-white rounded-full shadow-2xl">
                  <Sparkles className="absolute left-5 h-5 w-5 text-emerald-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Try: 'Peaceful mountain cabin under ₹3000' or 'Beach villa with pool'"
                    className="flex-1 border-0 bg-transparent px-14 py-5 text-gray-900 text-lg placeholder-gray-400 focus:outline-none rounded-full"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-4 flex flex-wrap justify-center gap-2"
              >
                {['Mountain retreat', 'Beach villa', 'Eco stay', 'Luxury palace'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearch(suggestion)}
                    className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm hover:bg-white/20 transition-colors border border-white/20"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryChange(category)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category}
                  </motion.button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <option value="ai-recommended">AI Recommended</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="eco-score">Eco Score</option>
                <option value="most-reviewed">Most Reviewed</option>
              </select>
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <Shield className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl dark:bg-gray-900"
            >
              <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-6 p-4">
                {/* Price Range */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Guests</h3>
                  <div className="flex gap-2">
                    {[0, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
                          guests === num
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {num === 0 ? "Any" : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Bedrooms</h3>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setBedrooms(num)}
                        className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
                          bedrooms === num
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {num === 0 ? "Any" : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Bathrooms</h3>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setBathrooms(num)}
                        className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
                          bathrooms === num
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {num === 0 ? "Any" : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {amenityOptions.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`rounded-full py-2 text-sm font-medium transition-colors ${
                          selectedAmenities.includes(amenity)
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[0, 4, 4.5, 4.8].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
                          minRating === rating
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {rating === 0 ? "Any" : rating + "+"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eco Score */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Eco Score</h3>
                  <div className="flex gap-2">
                    {[0, 70, 80, 90].map((score) => (
                      <button
                        key={score}
                        onClick={() => setMinEcoScore(score)}
                        className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
                          minEcoScore === score
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {score === 0 ? "Any" : score + "+"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  <button
                    onClick={() => setSuperhostOnly(!superhostOnly)}
                    className={`flex w-full items-center justify-between rounded-lg p-3 transition-colors ${
                      superhostOnly ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">Superhost Only</span>
                    <div className={`h-6 w-11 rounded-full transition-colors ${
                      superhostOnly ? "bg-emerald-500" : "bg-gray-300"
                    }`}>
                      <div className={`h-5 w-5 rounded-full bg-white transition-transform ${
                        superhostOnly ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </div>
                  </button>

                  <button
                    onClick={() => setInstantBookOnly(!instantBookOnly)}
                    className={`flex w-full items-center justify-between rounded-lg p-3 transition-colors ${
                      instantBookOnly ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">Instant Book Only</span>
                    <div className={`h-6 w-11 rounded-full transition-colors ${
                      instantBookOnly ? "bg-emerald-500" : "bg-gray-300"
                    }`}>
                      <div className={`h-5 w-5 rounded-full bg-white transition-transform ${
                        instantBookOnly ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 rounded-full border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="flex-1 rounded-full bg-emerald-500 py-3 font-semibold text-white transition-colors hover:bg-emerald-600"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
        {/* Trending Section */}
        {!search && activeCategory === "All" && !loading && (
          <section>
            <SectionHeader title="Trending Stays" subtitle="Most popular this month" icon={TrendingUp} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trendingStays.slice(0, 4).map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isWishlisted={wishlist.includes(property.id)}
                  onToggleWishlist={() => toggleWishlist(property.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* AI Picks Section */}
        {!search && !loading && (
          <section>
            <SectionHeader title="AI Picks for You" subtitle="Curated based on your preferences" icon={Sparkles} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStays
                .filter(p => p.aiMatch && p.aiMatch > 85)
                .slice(0, 4)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isWishlisted={wishlist.includes(property.id)}
                    onToggleWishlist={() => toggleWishlist(property.id)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* Best Eco Stays */}
        {!search && !loading && (
          <section>
            <SectionHeader title="Best Eco Stays" subtitle="Sustainable & environmentally friendly" icon={Leaf} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStays
                .filter(p => p.ecoScore && p.ecoScore >= 85)
                .slice(0, 4)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isWishlisted={wishlist.includes(property.id)}
                    onToggleWishlist={() => toggleWishlist(property.id)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* Hidden Gems */}
        {!search && !loading && (
          <section>
            <SectionHeader title="Hidden Gems" subtitle="Unique stays you won't find elsewhere" icon={Gem} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStays
                .filter(p => p.aiTags && p.aiTags.includes('unique'))
                .slice(0, 4)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isWishlisted={wishlist.includes(property.id)}
                    onToggleWishlist={() => toggleWishlist(property.id)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* All Properties */}
        <section>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeCategory === "All" ? "All Properties" : `${activeCategory} Properties`}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredStays.length} properties
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
                <Map className="h-4 w-4" />
                Map View
              </button>
              <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
                <Shield className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredStays.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
              <MapPin className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No properties found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  resetFilters();
                }}
                className="mt-4 rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredStays.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PropertyCard
                    property={property}
                    isWishlisted={wishlist.includes(property.id)}
                    onToggleWishlist={() => toggleWishlist(property.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>

      <Footer />

      {/* AI Assistant Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setAiChatOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-110 hover:shadow-xl"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      </motion.div>

      {/* AI Chat Window */}
      <AnimatePresence>
        {aiChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAiChatOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-24 right-6 z-50 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
            >
              {/* Chat Header */}
              <div className="border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-500 p-4 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">AI Travel Assistant</h3>
                      <p className="text-xs text-white/80">Powered by StayNest AI</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAiChatOpen(false)}
                    className="rounded-full p-2 hover:bg-white/20"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="space-y-3">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Hi! I'm your AI travel assistant. How can I help you today?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleSuggestedPrompt(prompt)}
                          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                          : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-2 dark:bg-gray-800">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about your trip..."
                    className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Sparkles className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
