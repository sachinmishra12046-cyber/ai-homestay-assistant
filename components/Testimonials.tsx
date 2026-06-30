interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    review:
      "The homestay was clean, peaceful, and exactly as shown. Booking was simple and the host was very welcoming.",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    rating: 5,
    review:
      "Great experience from start to finish. The location was perfect and the stay felt authentic and comfortable.",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    rating: 4,
    review:
      "Loved the local experience and friendly host. Would definitely recommend AI Homestay for budget-friendly travel.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${index < rating ? "text-yellow-500" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            What Our Guests Say
          </h2>
          <p className="mt-2 text-gray-600">
            Real feedback from travelers who booked through AI Homestay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <StarRating rating={item.rating} />
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                &ldquo;{item.review}&rdquo;
              </p>
              <p className="mt-5 text-sm font-semibold text-gray-900">
                {item.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
