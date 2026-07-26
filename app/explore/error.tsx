"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ExploreErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ExploreError({ error, reset }: ExploreErrorProps) {
  useEffect(() => {
    console.error("Explore route error", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <section className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-xl dark:border-emerald-900/60 dark:bg-gray-800">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xl font-bold text-white">
          !
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          We couldn&apos;t load the available homestays right now. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950"
          >
            Go home
          </Link>
        </div>
      </section>
    </main>
  );
}
