import type { ComponentType } from 'react';
import Link from 'next/link';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const siteLinks = [
  { href: '/species', label: 'Species' },
  { href: '/products', label: 'Products' },
  { href: '/products/millwork', label: 'Millwork' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/quote', label: 'Request a Quote' },
];

const legalLinks: Array<{ href: string; label: string }> = [
  // Uncomment when pages are created:
  // { href: '/privacy', label: 'Privacy Policy' },
  // { href: '/terms', label: 'Terms of Service' },
];

const socialLinks: Array<{ href: string; label: string; icon: ComponentType<{ className?: string }> }> = [
  // Uncomment when social accounts are ready:
  // { href: 'https://instagram.com/moorenewtonhardwoods', label: 'Instagram', icon: InstagramIcon },
  // { href: 'https://facebook.com/moorenewtonhardwoods', label: 'Facebook', icon: FacebookIcon },
  // { href: 'https://linkedin.com/company/moore-newton-hardwoods', label: 'LinkedIn', icon: LinkedInIcon },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-body/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-sm tracking-headline uppercase text-emphasis mb-6">
              Moore Newton Hardwoods
            </h2>
            <address className="not-italic space-y-3 text-body">
              <p className="font-body text-sm">
                2115 Williams Street
                <br />
                San Leandro, CA 94577
              </p>
              <p>
                <a
                  href="tel:+15103176500"
                  className="font-mono text-sm hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  (510) 317-6500
                </a>
              </p>
              <p className="font-body text-sm">
                Mon–Fri, 8:00 AM – 4:30 PM
              </p>
            </address>
          </div>

          {/* Site Links */}
          <div>
            <h2 className="font-display text-sm tracking-headline uppercase text-emphasis mb-6">
              Site
            </h2>
            <nav aria-label="Footer site links">
              <ul className="space-y-3">
                {siteLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-body hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal Links - hidden until pages are created */}
          {legalLinks.length > 0 && (
            <div>
              <h2 className="font-display text-sm tracking-headline uppercase text-emphasis mb-6">
                Legal
              </h2>
              <nav aria-label="Footer legal links">
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-body hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Social Links - hidden until social accounts are ready */}
          {socialLinks.length > 0 && (
            <div>
              <h2 className="font-display text-sm tracking-headline uppercase text-emphasis mb-6">
                Follow Us
              </h2>
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="p-2 text-body hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      aria-label={link.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-body/10">
          <p className="font-body text-sm text-body/70 text-center">
            &copy; {currentYear} Moore Newton Quality Hardwoods Corp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
