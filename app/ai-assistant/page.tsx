"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Toast from "@/components/ui/Toast";

interface RecommendResponse {
  recommendations: Array<{
    id: string;
    name: string;
    description: string;
    approximatePrice: number;
    rating: number;
    keyAmenities: string[];
    whyItMatches: string;
  }>;
  travelTips: string[];
}

export default function AIAssistantPage() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [guests, setGuests] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!destination.trim() || !budget.trim() || !guests.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: destination.trim(), budget, guests, preferences: preferences.trim() || undefined }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate recommendations");
      setRecommendation(data as RecommendResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Recommendations are temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">AI Travel Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400">Get personalized homestay recommendations powered by AI</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Preferences</h2>
            <div className="space-y-4">
              <Input label="Destination" placeholder="e.g., Manali, Goa, Kerala" value={destination} onChange={(e) => setDestination(e.target.value)} required />
              <Input label="Budget per Night (₹)" placeholder="e.g., 2500" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required />
              <Input label="Number of Guests" placeholder="e.g., 2" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} required />
              <Input label="Preferences (Optional)" placeholder="e.g., Quiet place with mountain view" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
              <Button onClick={handleGenerate} loading={loading} disabled={loading} className="w-full" size="lg">
                {loading ? "Generating Recommendations..." : "Generate Recommendations"}
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recommendations</h2>
            {loading && <div className="flex flex-col items-center justify-center py-12"><Loader size="lg" label="Finding matching homestays..." /></div>}
            {!loading && !recommendation && <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 dark:text-gray-400">Fill in your preferences to receive personalized homestay recommendations.</div>}
            {recommendation && <div className="space-y-6">
              {recommendation.recommendations.map((homestay, index) => (
                <div key={homestay.id} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-5 border border-emerald-200 dark:border-emerald-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{index + 1}. {homestay.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{homestay.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm"><span className="inline-flex items-center px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 font-medium">₹{homestay.approximatePrice}/night</span><span className="inline-flex items-center px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-yellow-700 dark:text-yellow-400 font-medium">⭐ {homestay.rating}</span></div>
                  <div className="mt-3"><p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Key Amenities:</p><div className="flex flex-wrap gap-2">{homestay.keyAmenities.map((amenity) => <span key={amenity} className="inline-block px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-700">{amenity}</span>)}</div></div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"><span className="font-semibold text-gray-900 dark:text-white">Why it matches: </span>{homestay.whyItMatches}</p>
                </div>
              ))}
              <div><h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Travel Tips</h4><ul className="space-y-1">{recommendation.travelTips.map((tip) => <li key={tip} className="text-sm text-gray-600 dark:text-gray-400 flex items-start"><span className="text-emerald-500 mr-2">•</span>{tip}</li>)}</ul></div>
            </div>}
          </div>
        </div>
      </main>
      <Footer />
      {error && <Toast message={error} variant="error" onClose={() => setError(null)} duration={5000} />}
    </div>
  );
}
