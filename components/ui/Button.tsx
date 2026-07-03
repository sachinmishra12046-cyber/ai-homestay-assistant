import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  /** @deprecated Prefer `children` instead */
  text?: string;
  loading?: boolean;
  icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-primary text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 border border-transparent",
  secondary:
    "bg-gray-900 text-white shadow-lg hover:bg-gray-800 border border-transparent dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
  outline:
    "bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500 hover:text-emerald-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:border-emerald-400 dark:hover:text-emerald-400",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent dark:text-gray-300 dark:hover:bg-gray-800",
  glass:
    "glass text-gray-700 hover:bg-white/80 border border-white/20 dark:text-gray-300 dark:hover:bg-gray-800/80",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3 text-base rounded-xl",
  xl: "px-10 py-4 text-lg rounded-2xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  text,
  className = "",
  type = "button",
  disabled,
  loading,
  icon,
  ...props
}: ButtonProps) {
  const label = children ?? text;

  return (
    <motion.button
      type={type as "button" | "submit" | "reset"}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={[
        "inline-flex items-center justify-center font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {label}
    </motion.button>
  );
}
