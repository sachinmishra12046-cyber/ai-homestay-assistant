"use client";

import Link from "next/link";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  private resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-xl dark:border-emerald-900/60 dark:bg-gray-900">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            !
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Something went wrong</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            We couldn&apos;t load this part of StayNest. Please try again.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={this.resetError}
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
}
