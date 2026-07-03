"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { generateTripPlan, AITripPlan } from "@/lib/ai";
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Car,
  Plane,
  Train,
  Bus,
  Sparkles,
  Clock,
  Utensils,
  Home,
  Luggage,
  Thermometer,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

interface TripFormData {
  destination: string;
  duration: number;
  budget: number;
  people: number;
  transport: "flight" | "train" | "bus" | "car" | "any";
  preferences: string;
}

export default function TripPlannerPage() {
  const [formData, setFormData] = useState<TripFormData>({
    destination: "",
    duration: 3,
    budget: 50000,
    people: 2,
    transport: "any",
    preferences: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripPlan, setTripPlan] = useState<AITripPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!formData.destination) {
      setError("Please enter a destination");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setTripPlan(null);

    try {
      const plan = await generateTripPlan(
        formData.destination,
        formData.duration,
        formData.budget,
        formData.people,
        formData.preferences
      );
      setTripPlan(plan);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate trip plan. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const transportIcons = {
    flight: Plane,
    train: Train,
    bus: Bus,
    car: Car,
    any: Car,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-[url('/images/travel-pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              AI-Powered Trip Planning
            </div>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              Plan Your Perfect Trip
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Let AI create a personalized itinerary for your next adventure. Just tell us where you want to go and we'll handle the rest.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="elevated" className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Trip Details</h2>

              <div className="space-y-6">
                {/* Destination */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g., Goa, Manali, Kerala"
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Duration (days)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                      min="1"
                      max="30"
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Budget (₹)
                  </label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                      min="1000"
                      step="1000"
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* People */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Number of People
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="number"
                      value={formData.people}
                      onChange={(e) => setFormData({ ...formData, people: parseInt(e.target.value) || 1 })}
                      min="1"
                      max="20"
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Transport */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Preferred Transport
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {(["flight", "train", "bus", "car", "any"] as const).map((option) => {
                      const Icon = transportIcons[option];
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, transport: option })}
                          className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all ${
                            formData.transport === option
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-xs capitalize">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Preferences (optional)
                  </label>
                  <textarea
                    value={formData.preferences}
                    onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                    placeholder="e.g., adventure activities, cultural experiences, food tours, relaxation..."
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
                    <XCircle className="h-5 w-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  loading={isGenerating}
                  size="lg"
                  className="w-full"
                >
                  {isGenerating ? "Generating Your Trip..." : "Generate Trip Plan"}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isGenerating && (
              <Card variant="elevated" className="flex h-full min-h-[500px] items-center justify-center p-8">
                <div className="text-center">
                  <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">Creating Your Perfect Trip</h3>
                  <p className="text-muted-foreground">AI is analyzing your preferences and crafting an amazing itinerary...</p>
                </div>
              </Card>
            )}

            {tripPlan && (
              <div className="space-y-6">
                {/* Trip Overview */}
                <Card variant="elevated" className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{tripPlan.destination}</h2>
                      <p className="text-muted-foreground">
                        {tripPlan.duration} days • {tripPlan.people} people • ₹{tripPlan.budget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl bg-primary/10 p-4">
                    <Wallet className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Total Cost</p>
                      <p className="text-xl font-bold text-primary">₹{tripPlan.totalEstimatedCost.toLocaleString()}</p>
                    </div>
                  </div>
                </Card>

                {/* Daily Itinerary */}
                <Card variant="elevated" className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Daily Itinerary</h3>
                  <div className="space-y-4">
                    {tripPlan.dailyItinerary.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl border border-border bg-card p-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">Day {day.day}</p>
                            <p className="text-sm text-muted-foreground">Est. Cost: ₹{day.estimatedCost.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Activities</p>
                              <ul className="list-inside list-disc text-muted-foreground">
                                {day.activities.map((activity, i) => (
                                  <li key={i}>{activity}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Utensils className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Meals</p>
                              <ul className="list-inside list-disc text-muted-foreground">
                                {day.meals.map((meal, i) => (
                                  <li key={i}>{meal}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Home className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Accommodation</p>
                              <p className="text-muted-foreground">{day.accommodation}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Tips & Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card variant="elevated" className="p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                      <Thermometer className="h-5 w-5 text-primary" />
                      Weather Tips
                    </h3>
                    <p className="text-sm text-muted-foreground">{tripPlan.weatherInfo}</p>
                  </Card>

                  <Card variant="elevated" className="p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                      <Luggage className="h-5 w-5 text-primary" />
                      Packing List
                    </h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {tripPlan.packingList.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Additional Tips */}
                <Card variant="elevated" className="p-6">
                  <h3 className="mb-4 text-lg font-bold">Travel Tips</h3>
                  <ul className="space-y-2">
                    {tripPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {!isGenerating && !tripPlan && (
              <Card variant="elevated" className="flex h-full min-h-[500px] items-center justify-center p-8">
                <div className="text-center">
                  <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">Your Trip Plan Will Appear Here</h3>
                  <p className="text-muted-foreground">Fill in the details on the left to generate your personalized AI-powered itinerary.</p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
