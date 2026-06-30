import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedStays from "@/components/FeaturedStays";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main>
        <section className="py-20 max-w-7xl mx-auto px-6">
          <Hero />
        </section>

        <section className="py-20 max-w-7xl mx-auto px-6">
          <SearchBar />
        </section>

        <section className="py-20 max-w-7xl mx-auto px-6">
          <FeaturedStays />
        </section>

        <section className="py-20 max-w-7xl mx-auto px-6">
          <WhyChooseUs />
        </section>

        <section className="py-20 max-w-7xl mx-auto px-6">
          <Testimonials />
        </section>
      </main>

      <Footer />
    </div>
  );
}
