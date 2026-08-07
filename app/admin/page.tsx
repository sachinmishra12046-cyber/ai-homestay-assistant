"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Users,
  Calendar,
  Home,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Settings,
  Sparkles,
  BarChart3,
  PieChart,
  Activity,
  MoreVertical,
  Download,
} from "lucide-react";

const adminStats = [
  {
    label: "Total Revenue",
    value: "₹12,45,890",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    label: "Total Bookings",
    value: "1,248",
    change: "+12.5%",
    trend: "up",
    icon: Calendar,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    label: "Active Users",
    value: "8,542",
    change: "+24.3%",
    trend: "up",
    icon: Users,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    label: "Properties Listed",
    value: "342",
    change: "+8.1%",
    trend: "up",
    icon: Home,
    gradient: "from-amber-500 to-orange-600",
  },
];

const recentBookings = [
  {
    id: "BK001",
    user: "Sachin Mishra",
    property: "Himalayan Pine Retreat",
    amount: "₹7,500",
    date: "2026-07-02",
    status: "confirmed",
  },
  {
    id: "BK002",
    user: "Priya Sharma",
    property: "Rainforest Canopy Lodge",
    amount: "₹11,196",
    date: "2026-07-01",
    status: "pending",
  },
  {
    id: "BK003",
    user: "Rahul Verma",
    property: "Desert Courtyard Haveli",
    amount: "₹12,897",
    date: "2026-06-30",
    status: "confirmed",
  },
  {
    id: "BK004",
    user: "Anjali Singh",
    property: "Coastal Bamboo Villa",
    amount: "₹9,597",
    date: "2026-06-29",
    status: "cancelled",
  },
];

const topProperties = [
  {
    name: "Himalayan Pine Retreat",
    location: "Manali",
    bookings: 156,
    revenue: "₹3,90,000",
    rating: 4.9,
    trend: "+15%",
  },
  {
    name: "Rainforest Canopy Lodge",
    location: "Wayanad",
    bookings: 142,
    revenue: "₹3,97,458",
    rating: 4.9,
    trend: "+12%",
  },
  {
    name: "Tea Garden Eco Bungalow",
    location: "Munnar",
    bookings: 128,
    revenue: "₹4,99,072",
    rating: 4.8,
    trend: "+18%",
  },
];

const aiInsights = [
  {
    title: "Booking Trend Analysis",
    insight: "Peak season expected in October. Consider increasing prices by 15% for Manali properties.",
    type: "revenue",
  },
  {
    title: "User Behavior",
    insight: "Users from metro cities prefer properties with WiFi and workspace. 78% of bookings include this requirement.",
    type: "user",
  },
  {
    title: "Property Performance",
    insight: "Properties with AI-generated descriptions receive 34% more bookings. Recommend updating all listings.",
    type: "property",
  },
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Monitor and manage your platform</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="md">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="md">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {adminStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <div className={`bg-gradient-${stat.gradient} p-5 text-white`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white/90">{stat.label}</p>
                    <stat.icon className="h-5 w-5 text-white/80" strokeWidth={2} />
                  </div>
                  <p className="mt-3 text-2xl sm:text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-primary" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span className={stat.trend === "up" ? "text-primary" : "text-destructive"}>
                      {stat.change}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Chart Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Revenue Overview</h2>
                    <p className="text-sm text-muted-foreground">Track your platform&apos;s financial performance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {["7d", "30d", "90d", "1y"].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                          selectedPeriod === period
                            ? "bg-primary text-white"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-xl">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Revenue Chart Component</p>
                    <p className="text-xs text-muted-foreground/60">Integrate with chart library (Recharts/Chart.js)</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Recent Bookings</h2>
                    <p className="text-sm text-muted-foreground">Latest bookings across all properties</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Booking ID</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Property</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                          <td className="py-3 px-4 font-medium text-foreground">{booking.id}</td>
                          <td className="py-3 px-4 text-muted-foreground">{booking.user}</td>
                          <td className="py-3 px-4 text-muted-foreground">{booking.property}</td>
                          <td className="py-3 px-4 font-medium text-foreground">{booking.amount}</td>
                          <td className="py-3 px-4 text-muted-foreground">{booking.date}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "success"
                                  : booking.status === "pending"
                                  ? "warning"
                                  : "danger"
                              }
                              size="sm"
                            >
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            {/* Top Properties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Top Performing Properties</h2>
                    <p className="text-sm text-muted-foreground">Properties with highest revenue and bookings</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {topProperties.map((property, index) => (
                    <motion.div
                      key={property.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{property.name}</h3>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{property.revenue}</p>
                        <p className="text-xs text-muted-foreground">{property.bookings} bookings</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="success" size="sm">
                          {property.rating} ⭐
                        </Badge>
                        <span className="text-xs text-primary flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {property.trend}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card variant="elevated" className="bg-gradient-primary text-white overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <Sparkles className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">AI Insights</h2>
                      <p className="text-sm text-white/80">Data-driven recommendations</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <motion.div
                        key={insight.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4"
                      >
                        <h3 className="font-semibold mb-2">{insight.title}</h3>
                        <p className="text-sm text-white/80">{insight.insight}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="glass" className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="md">
                    <Users className="h-4 w-4 mr-3" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="md">
                    <Home className="h-4 w-4 mr-3" />
                    Manage Properties
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="md">
                    <Calendar className="h-4 w-4 mr-3" />
                    Manage Bookings
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="md">
                    <Activity className="h-4 w-4 mr-3" />
                    View Analytics
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* User Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Card variant="elevated" className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">User Distribution</h2>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-border rounded-xl">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">User Distribution Chart</p>
                    <p className="text-xs text-muted-foreground/60">By region, age, or activity</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
