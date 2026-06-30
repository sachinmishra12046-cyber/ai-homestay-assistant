"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
  onClose?: () => void;
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {onClose ? (
        <button
          type="button"
          aria-label="Close modal"
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
      ) : (
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {children && (
          <div className="mt-4 text-sm text-gray-600 leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
