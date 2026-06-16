import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-sm md:text-base text-gray-600 mb-8">
          Welcome back! Manage your homestay recommendations and
          explore available stays.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">
              Total Homestays
            </h3>

            <p className="text-2xl md:text-3xl font-bold">
              6
            </p>
          </div>

          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">
              Recommended
            </h3>

            <p className="text-2xl md:text-3xl font-bold">
              4
            </p>
          </div>

          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">
              Bookings
            </h3>

            <p className="text-2xl md:text-3xl font-bold">
              12
            </p>
          </div>

          <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">
              Users
            </h3>

            <p className="text-2xl md:text-3xl font-bold">
              25
            </p>
          </div>

        </div>

        {/* Recommendations */}
        <section className="border rounded-lg p-4 md:p-6 shadow-sm mb-6">

          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Recent Recommendations
          </h2>

          <ul className="space-y-3 text-sm md:text-base">
            <li>🏡 Mountain View Cottage</li>
            <li>🏞️ River Side Retreat</li>
            <li>🌲 Forest Cabin</li>
            <li>🌊 Lake View Homestay</li>
          </ul>

        </section>

        {/* Quick Actions */}
        <section className="border rounded-lg p-4 md:p-6 shadow-sm">

          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">

            <button className="border rounded-lg px-4 py-3 hover:bg-gray-100 transition">
              Search Homestays
            </button>

            <button className="border rounded-lg px-4 py-3 hover:bg-gray-100 transition">
              View Listings
            </button>

            <button className="border rounded-lg px-4 py-3 hover:bg-gray-100 transition">
              Learn More
            </button>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}