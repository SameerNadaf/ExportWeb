"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { QuoteDialog } from "@/components/ui/QuoteDialog";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold font-heading text-primary">
              Anfal<span className="text-accent">GlobalExport</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Products
            </Link>
            <Link
              href="/certifications"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Certifications
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              className="p-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
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
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Moved outside header for proper stacking */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-background animate-in slide-in-from-right-10 duration-200">
          <div className="flex flex-col h-full">
            {/* Mobile Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-xl font-bold font-heading text-primary">
                Menu
              </span>
              <button
                className="p-2 text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
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

            {/* Menu Links */}
            <div className="flex flex-col items-center space-y-8 pt-10 px-6">
              <Link
                href="/"
                className="text-2xl font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-2xl font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/certifications"
                className="text-2xl font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Certifications
              </Link>
              <Link
                href="/about"
                className="text-2xl font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-2xl font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsQuoteOpen(true);
                }}
                className="w-full h-14 rounded-lg bg-primary text-xl font-bold text-primary-foreground shadow mt-4"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      )}

      <QuoteDialog isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
