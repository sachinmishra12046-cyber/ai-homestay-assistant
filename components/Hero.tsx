export default function Hero() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Find Your Perfect Homestay
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Explore comfortable and affordable homestays across
          different destinations with smart recommendations.
        </p>
        <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Explore Stays
        </button>
      </div>
    </section>
  );
}