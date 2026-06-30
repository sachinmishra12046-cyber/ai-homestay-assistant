import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  /** @deprecated Prefer `children` instead */
  text?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#16a34a] text-white shadow-sm hover:bg-green-700 border border-transparent",
  secondary:
    "bg-gray-900 text-white shadow-sm hover:bg-gray-800 border border-transparent",
  outline:
    "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  text,
  className = "",
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  const label = children ?? text;

  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]/30 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
}
