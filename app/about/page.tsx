import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">

        <section className="text-center py-16 px-6 bg-gray-100">
          <h1 className="text-4xl font-bold mb-4">
            About AI Homestay Assistant
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600">
            Helping travelers discover unique homestays through
            smart recommendations and a seamless experience.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-4">
            Our Mission
          </h2>

          <p className="text-gray-600">
            Our goal is to make finding the perfect homestay
            easier and more personalized using intelligent
            recommen
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-center mb-10">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                🏡 Smart Recommendations
              </h3>

              <p>
                Personalized stay suggestions based on
                user preferences.
              </p>
            </div>

            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                🔍 Easy Search
              </h3>

              <p>
                Quickly find homestays using simple
                search and filtering.
              </p>
            </div>

            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                ⭐ Trusted Experience
              </h3>

              <p>
                Clean interface with verified and
                user-friendly listings.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Us?
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>✔ Personalized recommendations</li>
            <li>✔ Easy-to-use platform</li>
            <li>✔ Responsive design</li>
            <li>✔ Reliable homestay listings</li>
          </ul>
        </section>

      </main>

      <Footer />
    </>
  );
}