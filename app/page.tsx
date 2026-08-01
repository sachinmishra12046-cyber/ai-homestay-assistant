import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import Stats from "@/components/Stats";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import AIRecommendation from "@/components/AIRecommendation";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-gradient-to-b from-green-50 via-white to-white text-gray-900 transition-colors duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 dark:text-gray-100">
      <Navbar />

      <main>
        <Hero />
        <SearchBar />
        <Stats />
        <FeaturedDestinations />
        <WhyChooseUs />
        <AIRecommendation />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
