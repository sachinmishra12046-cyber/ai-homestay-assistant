import Link from "next/link";

export interface StayCardProps {
  id: number;
  image: string;
  name: string;
  location: string;
  rating: number;
  price: number;
}

export default function StayCard({
  image,
  name,
  location,
  rating,
  price,
}: StayCardProps) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden dark:border-gray-800 dark:bg-gray-900">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">
            {name}
          </h3>
          <span className="shrink-0 text-sm font-medium text-gray-700 flex items-center gap-1">
            <svg
              className="h-4 w-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-1.5 text-sm text-gray-500">{location}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ₹{price.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-400">per night</p>
          </div>

          <Link
            href="/explore"
            className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
