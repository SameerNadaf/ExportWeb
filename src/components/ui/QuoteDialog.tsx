"use client";

import { useEffect, useRef } from "react";
import { ContactForm } from "./ContactForm";

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteDialog({ isOpen, onClose }: QuoteDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent scrolling on body
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close on click outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleClickOutside}
      className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="relative w-full h-full sm:h-auto sm:max-w-lg bg-background sm:rounded-xl shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-10 sm:slide-in-from-bottom-0 duration-200 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-xl font-bold font-heading">Request a Quote</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Tell us what you need and we'll get back to you.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <ContactForm className="border-0 shadow-none p-0" />
        </div>
      </div>
    </div>
  );
}
