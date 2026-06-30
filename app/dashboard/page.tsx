"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
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
} from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

type MenuItem = 
  | { label: string; href: string; icon: any; action?: never }
  | { label: string; action: "logout"; icon: any; href?: never };

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "My Bookings", href: "/bookings", icon: Calendar },
  { label: "Reviews", href: "/bookings", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Logout", action: "logout", icon: LogOut },
];

const stats = [
  {
    label: "Bookings",
    value: "12",
    gradient: "from-green-500 to-emerald-600",
    icon: Calendar,
  },
  {
    label: "Wishlist",
    value: "28",
    gradient: "from-rose-500 to-pink-600",
    icon: Heart,
  },
  {
    label: "Trips",
    value: "7",
    gradient: "from-blue-500 to-indigo-600",
    icon: MapPin,
  },
  {
    label: "Rewards",
    value: "2500 pts",
    gradient: "from-amber-500 to-orange-600",
    icon: Wallet,
  },
];

const recommendedStays = [
  {
    id: 1,
    name: "Himalayan Pine Retreat",
    location: "Manali, Himachal Pradesh",
    rating: 4.9,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Rainforest Canopy Lodge",
    location: "Wayanad, Kerala",
    rating: 4.9,
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Desert Courtyard Haveli",
    location: "Udaipur, Rajasthan",
    rating: 4.8,
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Coastal Bamboo Villa",
    location: "Gokarna, Karnataka",
    rating: 4.9,
    price: 3199,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Tea Garden Eco Bungalow",
    location: "Munnar, Kerala",
    rating: 4.8,
    price: 3899,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Jungle Safari Homestay",
    location: "Corbett, Uttarakhand",
    rating: 4.7,
    price: 2599,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  },
];

const recentBookings = [
  {
    property: "Himalayan Pine Retreat",
    date: "Apr 12 – Apr 15, 2026",
    guests: 2,
    status: "Paid",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    property: "Coastal Bamboo Villa",
    date: "May 3 – May 7, 2026",
    guests: 3,
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    property: "Tea Garden Eco Bungalow",
    date: "Feb 20 – Feb 23, 2026",
    guests: 2,
    status: "Completed",
    statusColor: "bg-gray-100 text-gray-700",
  },
];

const aiDestinations = ["Rishikesh", "Mussoorie", "Kasol", "Munnar"];

const recentActivity = [
  { title: "Booking Confirmed", time: "2 hours ago", icon: Calendar },
  { title: "Payment Successful", time: "5 hours ago", icon: Wallet },
  { title: "Host Replied", time: "Yesterday", icon: Users },
  { title: "Review Submitted", time: "2 days ago", icon: Star },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const activeTab = "dashboard";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/4 shrink-0 space-y-6">
              {/* Profile card */}
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl font-semibold text-white ring-4 ring-green-100">
                    {user?.avatar || "U"}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-gray-900">
                    {user?.name || "User"}
                  </h2>
                  <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
                    Verified
                  </span>
                </div>
              </div>

              {/* Menu — mobile: horizontal cards */}
              <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {menuItems.map(({ label, href, action, icon: Icon }) => (
                  action === "logout" ? (
                    <button
                      key={label}
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all bg-white border border-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                      {label}
                    </button>
                  ) : (
                    <Link
                      key={label}
                      href={href}
                      className={[
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                        activeTab === label.toLowerCase()
                          ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                          : "bg-white border border-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 shadow-sm",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                      {label}
                    </Link>
                  )
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <div className="lg:w-3/4 flex-1 space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Welcome back, Sachin. Here&apos;s what&apos;s happening with your trips.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, gradient, icon: Icon }) => (
                  <div
                    key={label}
                    className={[
                      "group rounded-2xl bg-gradient-to-br p-5 text-white shadow-lg transition-transform hover:scale-[1.02]",
                      gradient,
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white/90">{label}</p>
                      <Icon className="h-5 w-5 text-white/80" strokeWidth={2} />
                    </div>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold">{value}</p>
                  </div>
                ))}
              </div>

              {/* Search */}
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 sm:p-6">
                <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label htmlFor="destination" className="sr-only">
                      Destination
                    </label>
                    <input
                      id="destination"
                      type="text"
                      placeholder="Destination"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="sr-only">
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="guests" className="sr-only">
                      Guests
                    </label>
                    <select
                      id="guests"
                      defaultValue="2"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-green-600/20 hover:bg-green-700 transition-colors"
                  >
                    <Search className="h-4 w-4" strokeWidth={2} />
                    Search
                  </button>
                </form>
              </div>

              {/* Recommended stays */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  Recommended Stays
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recommendedStays.map((stay) => (
                    <article
                      key={stay.id}
                      className="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg"
                    >
                      <div className="relative">
                        <img
                          src={stay.image}
                          alt={stay.name}
                          className="h-48 w-full object-cover"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                          Eco Friendly
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-gray-900 leading-snug">
                            {stay.name}
                          </h3>
                          <span className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-gray-700">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {stay.rating}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                          {stay.location}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{stay.price.toLocaleString("en-IN")}
                            <span className="text-xs font-normal text-gray-400">
                              /night
                            </span>
                          </p>
                          <Link
                            href="/explore"
                            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Recent bookings */}
              <section className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left text-gray-500">
                        <th className="px-6 py-3 font-medium">Property</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Guests</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentBookings.map((booking) => (
                        <tr key={booking.property} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {booking.property}
                          </td>
                          <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                          <td className="px-6 py-4 text-gray-600">{booking.guests}</td>
                          <td className="px-6 py-4">
                            <span
                              className={[
                                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                booking.statusColor,
                              ].join(" ")}
                            >
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* AI recommendations */}
              <section className="rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-6 sm:p-8 text-white shadow-lg shadow-green-600/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                    <Sparkles className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h2 className="text-xl font-bold">AI Travel Suggestions</h2>
                </div>
                <p className="text-sm text-white/85 mb-5">
                  Based on your previous trips we recommend:
                </p>
                <div className="flex flex-wrap gap-3">
                  {aiDestinations.map((place) => (
                    <span
                      key={place}
                      className="rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/25 transition-colors cursor-default"
                    >
                      {place}
                    </span>
                  ))}
                </div>
              </section>

              {/* Recent activity */}
              <section className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Recent Activity
                </h2>
                <ol className="relative border-l border-green-200 ml-3 space-y-8">
                  {recentActivity.map(({ title, time, icon: Icon }, index) => (
                    <li key={title} className="relative pl-8">
                      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white ring-4 ring-white">
                        <Icon className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      <p className="text-sm font-semibold text-gray-900">{title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                      {index < recentActivity.length - 1 && null}
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
