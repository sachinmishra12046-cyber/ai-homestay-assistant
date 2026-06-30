"use client";

import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export default function AuthInput({
  label,
  icon: Icon,
  error,
  type = "text",
  className = "",
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" strokeWidth={2} />
        )}
        <input
          type={inputType}
          className={[
            "w-full rounded-xl border bg-white py-3 text-sm text-gray-900 outline-none transition-all",
            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
            "dark:border-gray-700 dark:bg-gray-900 dark:text-white",
            Icon ? "pl-10 pr-4" : "px-4",
            isPassword ? "pr-11" : "",
            error ? "border-red-400" : "border-gray-200",
            className,
          ].join(" ")}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
