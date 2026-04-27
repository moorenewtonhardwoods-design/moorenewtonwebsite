'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/species', label: 'Species' },
  { href: '/products', label: 'Products' },
  { href: '/products/millwork', label: 'Millwork' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <header className="border-b border-body/10">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Desktop layout */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl tracking-headline uppercase text-emphasis hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {/* TODO: Replace with actual logo SVG */}
            <span className="sr-only">Moore Newton Hardwoods - Home</span>
            <svg
              width="180"
              height="40"
              viewBox="0 0 180 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="1"
                y="1"
                width="178"
                height="38"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <text
                x="90"
                y="25"
                textAnchor="middle"
                fill="currentColor"
                className="font-display text-xs tracking-headline"
              >
                MOORE NEWTON
              </text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-xs tracking-label uppercase text-body hover:text-accent border-b-2 border-transparent hover:border-accent pb-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/quote"
            className="hidden lg:inline-flex font-display text-xs tracking-label uppercase px-6 py-2.5 border-2 border-emphasis text-emphasis bg-transparent hover:bg-emphasis hover:text-canvas transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Request a Quote
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -mr-2 text-body hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-canvas lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col h-full">
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-body/10">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="font-display text-xl tracking-headline uppercase text-emphasis focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span className="sr-only">Moore Newton Hardwoods - Home</span>
                <svg
                  width="180"
                  height="40"
                  viewBox="0 0 180 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="1"
                    y="1"
                    width="178"
                    height="38"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <text
                    x="90"
                    y="25"
                    textAnchor="middle"
                    fill="currentColor"
                    className="font-display text-xs tracking-headline"
                  >
                    MOORE NEWTON
                  </text>
                </svg>
              </Link>

              <button
                type="button"
                onClick={closeMobileMenu}
                className="p-2 -mr-2 text-body hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label="Close menu"
                autoFocus
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav
              className="flex-1 flex flex-col items-center justify-center gap-8 py-12"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="font-display text-2xl tracking-headline uppercase text-emphasis hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/quote"
                onClick={closeMobileMenu}
                className="mt-8 font-display text-sm tracking-label uppercase px-8 py-3 border-2 border-emphasis text-emphasis bg-transparent hover:bg-emphasis hover:text-canvas transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Request a Quote
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
