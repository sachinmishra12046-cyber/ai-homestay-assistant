"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  BadgeCheck,
  Calendar,
  Heart,
  Home,
  LogOut,
  MapPin,
  Search,
  Settings,
  Sparkles,
  Star,
  Users,
  Wallet,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useWishlist } from "@/context/WishlistProvider";
import { useEffect, useState } from "react";

type MenuItem =
  | { label: string; href: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; action?: never }
  | { label: string; action: "logout"; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; href?: never };

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "My Bookings", href: "/bookings", icon: Calendar },
  { label: "Reviews", href: "/bookings", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Logout", action: "logout", icon: LogOut },
];

interface Booking {
  id: string;
  property: {
    title: string;
    city: string;
  };
  checkIn: string;
  checkOut: string;
  status: string;
}

interface Property {
  id: string;
  title: string;
  city: string;
  pricePerNight: number;
  rating: number;
  images: string[];
}

export default function DashboardPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { wishlist } = useWishlist();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [recommendedStays, setRecommendedStays] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      setLoading(true);
      try {
        const [bookingsRes, recommendationsRes] = await Promise.all([
          fetch(`/api/bookings?userId=${user!.id}`),
          fetch('/api/recommendations?type=personalized'),
        ]);

        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setBookings(bookingsData.bookings || []);
        }

        if (recommendationsRes.ok) {
          const recData = await recommendationsRes.json();
          setRecommendedStays(recData.properties || []);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user?.id]);

  const handleMenuAction = (item: MenuItem) => {
    if (item.action === "logout") {
      logout();
      router.push("/");
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const completedBookings = bookings.filter((b) => b.status === "COMPLETED").length;
  const upcomingBookings = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "PENDING").length;

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length.toString(),
      change: `${upcomingBookings} upcoming`,
      gradient: "from-emerald-500 to-green-600",
      icon: Calendar,
    },
    {
      label: "Wishlist",
      value: wishlist.length.toString(),
      change: "Saved properties",
      gradient: "from-rose-500 to-pink-600",
      icon: Heart,
    },
    {
      label: "Trips Completed",
      value: completedBookings.toString(),
      change: `${upcomingBookings} upcoming`,
      gradient: "from-blue-500 to-indigo-600",
      icon: MapPin,
    },
    {
      label: "Rewards Points",
      value: "2,500",
      change: "+150 earned",
      gradient: "from-amber-500 to-orange-600",
      icon: Wallet,
    },
  ];

  const upcomingTrips = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "PENDING").slice(0, 2);

  const aiDestinations = [
    { name: "Rishikesh", reason: "Adventure activities", match: 95 },
    { name: "Mussoorie", reason: "Mountain retreat", match: 88 },
    { name: "Kasol", reason: "Peaceful getaway", match: 92 },
    { name: "Munnar", reason: "Nature lover", match: 90 },
  ];

  const recentActivity = [
    { title: "Booking Confirmed", time: "2 hours ago", icon: Calendar, description: "Coastal Bamboo Villa" },
    { title: "Payment Successful", time: "5 hours ago", icon: Wallet, description: "₹8,597 for 3 nights" },
    { title: "Host Replied", time: "Yesterday", icon: Users, description: "Quick response to inquiry" },
    { title: "Review Submitted", time: "2 days ago", icon: Star, description: "5-star rating for Himalayan Pine" },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <p className="text-gray-600 dark:text-gray-400">Please login to access dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/4 shrink-0 space-y-6">
              {/* Profile card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card variant="glass" className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary text-3xl font-semibold text-white shadow-lg shadow-emerald-500/30">
                        {user?.name?.[0] || "U"}
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-border">
                    <BadgeCheck className="h-4 w-4 text-primary" strokeWidth={2} />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-foreground">
                  {user?.name || "User"}
                </h2>
                <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
                <Badge variant="primary" className="mt-3">
                  Verified Traveler
                </Badge>
              </div>
            </Card>
          </motion.div>

          {/* Menu */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2"
          >
            {menuItems.map(({ label, href, action, icon: Icon }) => (
              action === "logout" ? (
                <button
                  key={label}
                  onClick={() => handleMenuAction({ label, action: "logout", icon: Icon })}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all glass hover:bg-destructive/10 hover:text-destructive"
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className={[
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    "dashboard" === label.toLowerCase()
                      ? "bg-gradient-primary text-white shadow-lg shadow-emerald-500/25"
                      : "glass hover:border-primary/50",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {label}
                </Link>
              )
            ))}
          </motion.nav>
        </aside>

        {/* Main content */}
        <div className="lg:w-3/4 flex-1 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back, {user?.name?.split(" ")[0] || "User"}. Here&apos;s what&apos;s happening with your trips.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map(({ label, value, change, gradient, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card variant="elevated" className="overflow-hidden">
                  <div className={`bg-gradient-${gradient} p-5 text-white`}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white/90">{label}</p>
                      <Icon className="h-5 w-5 text-white/80" strokeWidth={2} />
                    </div>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold">{value}</p>
                  </div>
                  <div className="p-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    {change}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Upcoming Trips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-foreground">Upcoming Trips</h2>
              <Link href="/bookings" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            {upcomingTrips.length === 0 ? (
              <Card className="p-12 text-center text-gray-500">No upcoming trips</Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {upcomingTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card variant="glass" className="p-5 hover:border-primary/30 transition-colors">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{trip.property.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {trip.property.city}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(trip.checkIn).toLocaleDateString()} – {new Date(trip.checkOut).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={trip.status === "CONFIRMED" ? "success" : "default"} size="sm">
                          {trip.status}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Recommended stays */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Recommended for You
              </h2>
              <Link href="/explore" className="text-sm text-primary hover:underline flex items-center gap-1">
                Explore more <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            {recommendedStays.length === 0 ? (
              <Card className="p-12 text-center text-gray-500">No recommendations yet</Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedStays.slice(0, 3).map((stay, index) => (
                  <motion.article
                    key={stay.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card variant="elevated" hover className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={stay.images[0] || "/placeholder.jpg"}
                          alt={stay.title}
                          className="h-48 w-full object-cover"
                        />
                        <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground leading-snug">
                            {stay.title}
                          </h3>
                          <span className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {stay.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                          {stay.city}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-lg font-bold text-foreground">
                            ₹{stay.pricePerNight.toLocaleString("en-IN")}
                            <span className="text-xs font-normal text-muted-foreground">
                              /night
                            </span>
                          </p>
                          <Button size="sm">Book Now</Button>
                        </div>
                      </div>
                    </Card>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.section>

          {/* AI Travel Suggestions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Card variant="elevated" className="bg-gradient-primary text-white overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <Sparkles className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">AI Travel Suggestions</h2>
                    <p className="text-sm text-white/80">Based on your preferences and travel history</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiDestinations.map((dest) => (
                    <div
                      key={dest.name}
                      className="flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold">{dest.name}</p>
                        <p className="text-xs text-white/70">{dest.reason}</p>
                      </div>
                      <Badge variant="default" className="bg-white/20 text-white border-white/30">
                        {dest.match}% match
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Recent activity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card variant="glass" className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Recent Activity
              </h2>
              <ol className="relative border-l-2 border-border ml-3 space-y-8">
                {recentActivity.map(({ title, time, icon: Icon, description }, index) => (
                  <li key={title} className="relative pl-8">
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-white ring-4 ring-background">
                      <Icon className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{time}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
