import { ReactNode } from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Eco Friendly",
    description:
      "Stay at homestays that follow sustainable and eco-conscious practices.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Verified Hosts",
    description:
      "Every host is verified for safety, cleanliness, and reliable hospitality.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "AI Recommendations",
    description:
      "Get stay suggestions based on your destination, budget, and travel preferences.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Secure Booking",
    description:
      "Book with confidence through a simple and secure booking experience.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-2 text-gray-600">
            Everything you need for a smooth homestay booking experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm"
            >
              <div className="h-11 w-11 rounded-lg bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a]">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
