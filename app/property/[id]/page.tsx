"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthProvider";
import { useWishlist } from "@/context/WishlistProvider";
import {
  MapPin,
  Users,
  Home,
  Wifi,
  Car,
  Utensils,
  Coffee,
  Waves,
  Mountain,
  Flame,
  Star,
  Heart,
  Share2,
  ChevronLeft,
  Check,
} from "lucide-react";
import { format } from "date-fns";

interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  address: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  images: string[];
  amenities: string[];
  rating: number;
  averageRating: number;
  host: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
  }>;
  _count: {
    reviews: number;
    bookings: number;
  };
}

const amenityIcons: { [key: string]: React.ComponentType<{ className?: string; strokeWidth?: number }> } = {
  wifi: Wifi,
  parking: Car,
  breakfast: Utensils,
  kitchen: Coffee,
  "beach-access": Waves,
  trekking: Mountain,
  campfire: Flame,
  ac: Waves,
  pool: Waves,
  spa: Waves,
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        const data = await response.json();
        if (response.ok) {
          setProperty(data);
        }
      } catch (error) {
        console.error("Error loading property:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [params.id]);

  const isWishlisted = property ? wishlist.includes(String(property.id)) : false;

  const handleBooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    setBookingLoading(true);
    try {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = property!.pricePerNight * nights;

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          propertyId: property!.id,
          checkIn: checkInDate.toISOString(),
          checkOut: checkOutDate.toISOString(),
          totalPrice,
        }),
      });

      if (response.ok) {
        alert("Booking created successfully!");
        router.push("/bookings");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create booking");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-center text-gray-500">Property not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = nights * property.pricePerNight;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Explore
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8 overflow-hidden rounded-2xl">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-96 w-full object-cover"
                  />
                </div>
                {property.images.slice(1, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    className="h-48 w-full object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{property.title}</h1>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{property.city}, {property.country}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(String(property.id))}
                    className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Heart
                      className={`h-6 w-6 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </button>
                  <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Share2 className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{property.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500">({property._count.reviews} reviews)</span>
                </div>
                <div className="text-gray-500">•</div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{property.guests} guests</span>
                </div>
                <div className="text-gray-500">•</div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Home className="h-4 w-4" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">About this place</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check;
                  return (
                    <div key={amenity} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Icon className="h-5 w-5" />
                      <span className="capitalize">{amenity.replace(/-/g, " ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Host Info */}
            <div className="mb-8 rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Hosted by {property.host.name}</h2>
              <div className="flex items-center gap-4">
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{property.host.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{property._count.bookings} bookings hosted</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {property._count.reviews} Reviews
              </h2>
              <div className="space-y-4">
                {property.reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{review.user.name}</p>
                          <p className="text-sm text-gray-500">{format(new Date(review.createdAt), "MMMM yyyy")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6 shadow-xl">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{property.pricePerNight.toLocaleString()}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{property.averageRating.toFixed(1)}</span>
                </div>
              </div>

              <div className="mb-4 space-y-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Guests
                  </label>
                  <select
                    value={guests.toString()}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                  >
                    {Array.from({ length: property.guests }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} guest{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={bookingLoading || !checkIn || !checkOut}
                className="mb-4 w-full"
              >
                {bookingLoading ? "Processing..." : "Reserve"}
              </Button>

              {nights > 0 && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      ₹{property.pricePerNight.toLocaleString()} × {nights} nights
                    </span>
                    <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cleaning fee</span>
                    <span className="font-semibold">₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Service fee</span>
                    <span className="font-semibold">₹{Math.round(totalPrice * 0.1)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 dark:border-gray-800">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{(totalPrice + 500 + Math.round(totalPrice * 0.1)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <p className="mt-4 text-center text-xs text-gray-500">You won&apos;t be charged yet</p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
