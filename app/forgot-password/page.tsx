"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import { Mail } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email and we&apos;ll send you a link to reset your password."
      footerText="Remember your password?"
      footerLink="Sign In"
      footerLinkHref="/login"
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        {sent ? (
          <div className="text-center py-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Check your email</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">We sent a reset link to {email}</p>
            <Link href="/reset-password" className="mt-6 inline-block text-sm font-semibold text-emerald-600">Continue to reset →</Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password?</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No worries, we&apos;ll help you recover it.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <AuthInput label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} error={error} placeholder="you@email.com" />
              <button type="submit" className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">Send Reset Link</button>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
