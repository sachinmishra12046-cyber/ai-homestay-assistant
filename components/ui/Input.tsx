import { InputHTMLAttributes } from "react";

type InputSize = "sm" | "md";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: InputSize;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-3 py-2.5 text-sm",
};

export default function Input({
  label,
  error,
  size = "md",
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-gray-500 mb-1.5"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={[
          "w-full rounded-lg border bg-white text-gray-900 placeholder:text-gray-400",
          "outline-none transition-colors",
          "focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20",
          "disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed",
          error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200",
          sizeStyles[size],
          className,
        ].join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <p id={inputId ? `${inputId}-error` : undefined} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
