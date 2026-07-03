import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  default:
    "bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  primary:
    "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  secondary:
    "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  success:
    "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  warning:
    "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  danger:
    "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs rounded-md",
  md: "px-2.5 py-1 text-sm rounded-lg",
  lg: "px-3 py-1.5 text-base rounded-xl",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={[
        "inline-flex items-center font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {children}
    </motion.span>
  );
}
