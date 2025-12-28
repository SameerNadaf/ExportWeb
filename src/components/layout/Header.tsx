"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 z-50">
          <span className="text-xl font-bold font-heading text-primary tracking-tight">
            Greenary<span className="text-accent">Export</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden p-2 text-primary z-50 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-background z-40 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-200">
            <nav className="flex flex-col items-center space-y-6 text-lg font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors hover:text-primary ${
                    pathname === link.href
                      ? "text-primary font-bold"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white shadow transition-colors hover:bg-primary/90"
              >
                Get Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
