import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated";
  hover?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  default:
    "bg-card border border-border rounded-2xl shadow-sm",
  glass:
    "glass rounded-2xl",
  elevated:
    "bg-card border border-border rounded-2xl shadow-xl",
};

export default function Card({
  children,
  className = "",
  variant = "default",
  hover = false,
  onClick,
}: CardProps) {
  const Component = onClick ? motion.div : "div";
  const motionProps = onClick && hover ? {
    whileHover: { y: -4 },
    transition: { duration: 0.2 },
  } : {};

  return (
    <Component
      onClick={onClick}
      {...motionProps}
      className={[
        variantStyles[variant],
        hover ? "cursor-pointer transition-transform" : "",
        className,
      ].join(" ")}
    >
      {children}
    </Component>
  );
}
