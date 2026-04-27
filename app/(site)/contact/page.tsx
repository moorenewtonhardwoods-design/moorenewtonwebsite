import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FinalCTA } from '@/components/sections';
import { FormPlaceholder } from '@/components/FormPlaceholder';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildBreadcrumbListSchema,
  buildContactPageSchema,
  buildLocalBusinessSchema,
} from '@/lib/seo/schema';
import { getSiteSettings } from '@/lib/sanity/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Moore Newton Hardwoods | San Leandro, CA',
  description:
    'Contact Moore Newton Hardwoods in San Leandro. Visit our showroom, call our sales team, or request a quote. Open Monday–Friday 7:00 AM–4:30 PM.',
  path: '/contact',
});

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <JsonLd
        data={buildContactPageSchema({
          title: 'Contact Moore Newton Hardwoods',
          description: 'Contact Moore Newton Hardwoods in San Leandro, California.',
        })}
      />
      {siteSettings && <JsonLd data={buildLocalBusinessSchema(siteSettings)} />}

      {/* Hero */}
      <PageHero
        eyebrow="Contact"
        title="Contact Us."
        subhead="Visit our San Leandro showroom, call our sales team, or send us a message. We're here to help with your hardwood lumber and millwork needs."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Contact' }]}
      />

      {/* Contact Sales */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Contact Sales</Eyebrow>
          <H2 className="mb-6">Send us a message.</H2>
          <Body className="mb-8">
            Have a question about our inventory, need a quote, or want to discuss a project? Fill
            out the form below and our sales team will get back to you within one business day.
          </Body>

          <FormPlaceholder formName="contact" />
        </div>
      </section>

      {/* Call In */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Call In</Eyebrow>
          <H2 className="mb-6">Talk to our sales team directly.</H2>
          <Body className="mb-6">
            For quotes, stock checks, or project discussions, call our sales desk during business
            hours. Our team knows the inventory and can answer questions about species, grades, and
            availability on the spot.
          </Body>
          <Body className="mb-6">
            <strong>Phone:</strong>{' '}
            <a href="tel:+15103521855" className="text-accent hover:text-emphasis underline">
              (510) 352-1855
            </a>
          </Body>
          <Body>
            <strong>Hours:</strong> Monday–Friday, 7:00 AM–4:30 PM
          </Body>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Visit Us</Eyebrow>
          <H2 className="mb-6">Come see the inventory.</H2>
          <Body className="mb-6">
            Our San Leandro showroom is open to the public. Walk the aisles, pull boards, and talk
            to the sales team about your project. No appointment needed.
          </Body>

          <div className="mb-6">
            <Body className="mb-2">
              <strong>Moore Newton Hardwoods</strong>
            </Body>
            <Body>
              2075 Williams Street
              <br />
              San Leandro, CA 94577
            </Body>
          </div>

          <Body className="mb-6">
            <strong>Showroom Hours:</strong>
            <br />
            Monday–Friday: 7:00 AM–4:30 PM
            <br />
            Saturday–Sunday: Closed
          </Body>

          <Body>
            <a
              href="https://maps.google.com/?q=2075+Williams+Street+San+Leandro+CA+94577"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-emphasis underline"
            >
              Get directions on Google Maps →
            </a>
          </Body>
        </div>
      </section>

      {/* Pickup & Delivery */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Pickup & Delivery</Eyebrow>
          <H2 className="mb-6">Will-call or delivered to your shop.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">Will-call pickup</H3>
              <Body>
                Place your order ahead of time and pick it up at our loading dock. Call when you
                arrive and we&apos;ll have your material ready. Most orders are ready for pickup
                within a few hours of confirmation.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Local delivery</H3>
              <Body>
                We deliver throughout the Bay Area and Northern California. Delivery is scheduled at
                the time of order; typical lead time is 2–5 business days depending on your
                location. See our{' '}
                <Link href="/delivery" className="text-accent hover:text-emphasis underline">
                  delivery page
                </Link>{' '}
                for zone details and scheduling.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Follow Us</Eyebrow>
          <H2 className="mb-6">Stay connected.</H2>
          <Body className="mb-6">
            Follow Moore Newton on social media for inventory updates, project features, and news
            from the showroom.
          </Body>
          <Body>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:info@moorenewton.com"
              className="text-accent hover:text-emphasis underline"
            >
              info@moorenewton.com
            </a>
          </Body>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        heading="Need a quote?"
        body="Tell us what you're looking for — species, dimensions, quantity — and we'll get back to you within one business day."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Browse Species →', href: '/species', variant: 'secondary' }}
      />
    </>
  );
}
