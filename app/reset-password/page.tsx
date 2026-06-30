"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import { Lock } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (password.length < 6) next.password = "Minimum 6 characters";
    if (password !== confirm) next.confirm = "Passwords do not match";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  };

  return (
    <AuthLayout
      title="New Password"
      subtitle="Choose a strong password to secure your StayNest account."
      footerText="Back to"
      footerLink="Sign In"
      footerLinkHref="/login"
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        {done ? (
          <div className="text-center py-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Password updated!</p>
            <Link href="/login" className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white">Sign In</Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <AuthInput label="New Password" type="password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
              <AuthInput label="Confirm Password" type="password" icon={Lock} value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
              <button type="submit" className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Update Password</button>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
