import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <section className="max-w-5xl mx-auto px-4 py-8">
          <input
            type="text"
            placeholder="Search destination..."
            className="
              w-full
              border
              rounded-lg
              p-3
              shadow-sm
            "
          />
        </section>

        <section className="max-w-6xl mx-auto px-4 py-10">

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Featured Homestays
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}