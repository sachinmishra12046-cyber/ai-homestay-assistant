import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Bookings", href: "/bookings" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🌿</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                StayNest
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              AI-powered eco homestay recommendations across India.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>support@staynest.com</li>
              <li>+91 98765 43210</li>
              <li>Bangalore, India</li>
            </ul>
          </div>
        </div>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <p className="text-center text-sm text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} StayNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
