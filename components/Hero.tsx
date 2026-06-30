import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-tight tracking-tight">
              Find Your Perfect
              <span className="block text-[#16a34a]">Eco Homestay</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
              Discover comfortable, affordable, and eco-friendly homestays across
              India. Book authentic stays with verified hosts and local
              experiences.
            </p>

            <Link
              href="/explore"
              className="inline-block mt-8 rounded-lg bg-[#16a34a] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
            >
              Explore Stays
            </Link>
          </div>

          {/* Right — hero image */}
          <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
                alt="Scenic eco homestay surrounded by nature"
                className="w-full aspect-[4/3] object-cover"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
