"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import {
  Home,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Users,
  Star,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { format } from "date-fns";

interface Property {
  id: string;
  title: string;
  city: string;
  pricePerNight: number;
  rating: number;
  _count: {
    bookings: number;
    reviews: number;
  };
}

interface Booking {
  id: string;
  property: {
    title: string;
  };
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
}

export default function HostDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "properties" | "bookings" | "analytics">("overview");
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      setLoading(true);
      try {
        const [propsRes, bookingsRes] = await Promise.all([
          fetch(`/api/host/properties?hostId=${user!.id}`),
          fetch(`/api/host/bookings?hostId=${user!.id}`),
        ]);

        if (propsRes.ok) {
          const propsData = await propsRes.json();
          setProperties(propsData.properties || []);
        }

        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setBookings(bookingsData.bookings || []);
        }
      } catch (error) {
        console.error("Error loading host data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user?.id]);

  const totalEarnings = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length;
  const avgRating = properties.length > 0
    ? properties.reduce((sum, p) => sum + p.rating, 0) / properties.length
    : 0;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <p className="text-gray-600 dark:text-gray-400">Please login to access host dashboard</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Host Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your properties and bookings</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-gray-200 dark:border-gray-800">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "properties", label: "Properties", icon: Home },
            { id: "bookings", label: "Bookings", icon: Calendar },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "overview" | "properties" | "bookings" | "analytics")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Properties</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{properties.length}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
                </div>
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">₹{totalEarnings.toLocaleString()}</p>
                </div>
                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900">
                  <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</p>
                </div>
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                  <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === "properties" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Properties</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </div>

            {properties.length === 0 ? (
              <Card className="p-12 text-center text-gray-500">
                No properties yet. Add your first property to start hosting.
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white">{property.title}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{property.city}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{property.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          ₹{property.pricePerNight.toLocaleString()}/night
                        </p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Bookings</h2>

            {bookings.length === 0 ? (
              <Card className="p-12 text-center text-gray-500">
                No bookings yet.
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{booking.property.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {format(new Date(booking.checkIn), "MMM d, yyyy")} – {format(new Date(booking.checkOut), "MMM d, yyyy")}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                          ₹{booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Analytics</h2>
            <Card className="p-12 text-center text-gray-500">
              Analytics coming soon...
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
