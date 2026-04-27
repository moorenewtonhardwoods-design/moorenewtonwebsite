import type { Metadata } from 'next';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Delivery & Pickup | Moore Newton Hardwoods | Bay Area',
  description:
    'Moore Newton delivers hardwood lumber throughout the Bay Area and Northern California. Same-week delivery, will-call pickup, and commercial freight options.',
  path: '/delivery',
});

const faqItems = [
  {
    question: 'How much does delivery cost?',
    answer:
      'Delivery is quoted per order based on zone, material volume, and equipment requirements. Standard deliveries within Zone 1 (East Bay) are typically $50–$100. Zones 2–3 scale up from there. Exact cost is included in your order quote.',
  },
  {
    question: 'Can I get same-day delivery?',
    answer:
      'Same-day delivery is occasionally possible for orders placed early in the morning, depending on truck availability and your location. Call the sales desk to check availability. Standard lead time is 2–5 business days.',
  },
  {
    question: 'Do you deliver to job sites?',
    answer:
      'Yes. We deliver to job sites, shops, residences, and commercial addresses. For job-site deliveries, make sure there is adequate access for the delivery truck and someone available to receive the material.',
  },
  {
    question: "What if I'm not there when the truck arrives?",
    answer:
      'Someone must be present to receive the delivery and sign for the material. If no one is available, the driver will attempt to contact you. If delivery cannot be completed, a redelivery fee may apply.',
  },
  {
    question: 'Can you deliver to a second-floor or inside location?',
    answer:
      'Standard delivery is curbside or loading dock. Inside delivery and second-floor delivery require prior arrangement and may incur additional charges depending on access and material volume.',
  },
  {
    question: 'Do you ship outside the Bay Area?',
    answer:
      'Yes. For locations outside our standard delivery zone, we can arrange freight shipping via common carrier. Contact the sales desk for a freight quote.',
  },
  {
    question: 'How do I schedule will-call pickup?',
    answer:
      "Place your order by phone or through the quote form and specify will-call pickup. We'll confirm when your order is ready. Call when you arrive at the loading dock and we'll bring out your material.",
  },
  {
    question: 'What are your loading dock hours?',
    answer:
      'The loading dock is open Monday–Friday, 7:00 AM–4:30 PM. Last pickup is at 4:00 PM to allow time for loading.',
  },
  {
    question: 'Can I pick up the same day I order?',
    answer:
      'For stock items, same-day pickup is usually available if you order in the morning. Millwork orders and large orders may require additional lead time. The sales team will confirm availability when you place your order.',
  },
];

export default function DeliveryPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Delivery', path: '/delivery' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Delivery"
        title="Delivery & Pickup."
        subhead="Moore Newton delivers hardwood lumber, plywood, and millwork throughout the Bay Area and Northern California. Will-call pickup is available at our San Leandro facility."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Delivery' }]}
      />

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">How It Works</Eyebrow>
          <H2 className="mb-6">Two ways to get your material.</H2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <H3 className="text-base mb-2">Local Delivery</H3>
              <Body>
                We run our own trucks throughout the Bay Area and Northern California. Delivery is
                scheduled at the time of order, with typical lead times of 2–5 business days
                depending on your location.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Will-Call Pickup</H3>
              <Body>
                Place your order ahead of time and pick it up at our San Leandro loading dock. Most
                stock orders are ready within a few hours of confirmation.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zone */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Delivery Zone</Eyebrow>
          <H2 className="mb-6">Where we deliver.</H2>
          <Body className="mb-6">
            Our delivery zone covers the Bay Area and extends into Northern California. Delivery
            pricing is tiered by zone:
          </Body>

          <ul className="space-y-3 text-body list-disc pl-6 mb-6">
            <li>
              <strong>Zone 1 (East Bay)</strong> — Oakland, Berkeley, San Leandro, Hayward,
              Fremont, Alameda, and surrounding areas.
            </li>
            <li>
              <strong>Zone 2 (Greater Bay Area)</strong> — San Francisco, San Jose, Palo Alto,
              Marin County, Contra Costa County, and surrounding areas.
            </li>
            <li>
              <strong>Zone 3 (Extended)</strong> — Santa Cruz, Monterey, Sacramento, Napa, Sonoma,
              and other Northern California locations.
            </li>
          </ul>

          <Body>
            For locations outside these zones, we can arrange freight shipping via common carrier.
            Contact the sales desk for a freight quote.
          </Body>
        </div>
      </section>

      {/* Scheduling */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Scheduling</Eyebrow>
          <H2 className="mb-6">When to expect your delivery.</H2>
          <Body className="mb-6">
            Delivery is scheduled at the time your order is confirmed. Standard lead time is 2–5
            business days, depending on:
          </Body>

          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>Your location (zone)</li>
            <li>Current truck schedule</li>
            <li>Material availability (stock vs. millwork)</li>
            <li>Order size and equipment requirements</li>
          </ul>

          <Body className="mb-6">
            The sales team will confirm your delivery window when you place your order. We&apos;ll call
            the day before to confirm timing and again when the driver is en route.
          </Body>

          <Body>
            <strong>Need it faster?</strong> Same-week and occasionally same-day delivery is
            possible depending on truck availability. Call the sales desk to check.
          </Body>
        </div>
      </section>

      {/* Will-Call */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Will-Call Pickup</Eyebrow>
          <H2 className="mb-6">Pick up at our San Leandro facility.</H2>
          <Body className="mb-6">
            Will-call pickup is available for all orders. Here&apos;s how it works:
          </Body>

          <div className="space-y-4">
            <div>
              <H3 className="text-base mb-2">1. Place your order.</H3>
              <Body>
                Call the sales desk or submit a quote request. Specify that you want will-call
                pickup.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">2. Wait for confirmation.</H3>
              <Body>
                We&apos;ll confirm when your order is ready. Stock items are usually ready within a
                few hours; millwork orders require additional lead time.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">3. Pick up at the dock.</H3>
              <Body>
                Drive to our loading dock during business hours. Call when you arrive and we&apos;ll
                bring out your material.
              </Body>
            </div>
          </div>

          <Body className="mt-6">
            <strong>Loading dock hours:</strong> Monday–Friday, 7:00 AM–4:30 PM. Last pickup at
            4:00 PM.
          </Body>
        </div>
      </section>

      {/* Delivery Logistics */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Delivery Logistics</Eyebrow>
          <H2 className="mb-6">What to know before your delivery.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">Access requirements</H3>
              <Body>
                Make sure the delivery location is accessible by truck. For tight spaces, steep
                driveways, or restricted access, let us know at the time of order so we can plan
                accordingly.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Someone must be present</H3>
              <Body>
                Someone must be available to receive the delivery and sign for the material. If no
                one is present, we may not be able to complete the delivery.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Curbside delivery is standard</H3>
              <Body>
                Standard delivery is curbside or loading dock. Inside delivery, garage delivery, or
                second-floor delivery require prior arrangement and may incur additional charges.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Inspect on arrival</H3>
              <Body>
                Inspect your material when it arrives. If anything is damaged or missing, note it on
                the delivery receipt and contact the sales team immediately.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Frequently Asked Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Ready to place an order?"
        body="Tell us what you need and we'll confirm pricing, availability, and delivery timing within one business day."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Contact Sales →', href: '/contact', variant: 'secondary' }}
      />
    </>
  );
}
