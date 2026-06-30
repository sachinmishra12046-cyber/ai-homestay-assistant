"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import {
  GitFork,
  Globe,
  Lock,
  Mail
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Minimum 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      setErrors({ email: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access AI recommendations, bookings, and your personalized travel dashboard."
      footerText="Don't have an account?"
      footerLink="Create Account"
      footerLinkHref="/signup"
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In 👋</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Login to continue your journey.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <AuthInput label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@email.com" autoComplete="email" />
          <AuthInput label="Password" type="password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} placeholder="••••••••" autoComplete="current-password" />

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30" />
              Remember me
            </label>
            <Link href="/forgot-password" className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Forgot Password?</Link>
          </div>

          <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-sm font-semibold text-white shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-gray-400 dark:bg-gray-900">Or</span></div>
        </div>

        <div className="space-y-3">
          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            <Globe className="h-4 w-4" /> Continue with Google
          </button>
          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            <GitFork className="h-4 w-4" /> Continue with GitHub
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
