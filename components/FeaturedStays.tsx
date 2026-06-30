import StayCard from "@/components/StayCard";

const featuredStays = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    name: "Himalayan Pine Retreat",
    location: "Manali, Himachal Pradesh",
    rating: 4.9,
    price: 3499,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    name: "Rainforest Canopy Lodge",
    location: "Wayanad, Kerala",
    rating: 4.8,
    price: 2799,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    name: "Desert Courtyard Haveli",
    location: "Udaipur, Rajasthan",
    rating: 4.7,
    price: 4299,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    name: "Coastal Bamboo Villa",
    location: "Gokarna, Karnataka",
    rating: 4.9,
    price: 3199,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    name: "Tea Garden Eco Bungalow",
    location: "Munnar, Kerala",
    rating: 4.8,
    price: 3899,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    name: "Jungle Safari Homestay",
    location: "Corbett, Uttarakhand",
    rating: 4.6,
    price: 2599,
  },
];

export default function FeaturedStays() {
  return (
    <section className="bg-white dark:bg-gray-950 px-4 sm:px-6 lg:px-8 py-16 lg:py-20 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Featured Stays
          </h2>
          <p className="mt-2 text-gray-600">
            Handpicked homestays loved by travelers across India
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredStays.map((stay) => (
            <StayCard key={stay.id} {...stay} />
          ))}
        </div>
      </div>
    </section>
  );
}
