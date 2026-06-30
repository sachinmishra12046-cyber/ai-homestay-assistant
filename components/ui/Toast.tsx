"use client";

import { useEffect } from "react";

type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
  /** Auto-dismiss after ms. Set to 0 to disable. */
  duration?: number;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "border-green-200",
  error: "border-red-200",
  info: "border-gray-200",
};

const iconStyles: Record<ToastVariant, string> = {
  success: "text-[#16a34a]",
  error: "text-red-500",
  info: "text-gray-500",
};

export default function Toast({
  message,
  variant = "success",
  onClose,
  duration = 0,
}: ToastProps) {
  useEffect(() => {
    if (!onClose || duration <= 0) return;

    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [message, onClose, duration]);

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live="polite"
      className={[
        "fixed top-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border bg-white p-4 shadow-lg",
        variantStyles[variant],
      ].join(" ")}
    >
      <span className={["mt-0.5 shrink-0", iconStyles[variant]].join(" ")} aria-hidden="true">
        {variant === "success" && (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {variant === "error" && (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {variant === "info" && (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </span>

      <p className="flex-1 text-sm text-gray-700 leading-relaxed">{message}</p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
