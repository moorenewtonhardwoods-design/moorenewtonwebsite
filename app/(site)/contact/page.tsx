import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FinalCTA } from '@/components/sections';
import { ContactForm } from '@/components/forms';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildBreadcrumbListSchema,
  buildContactPageSchema,
  buildLocalBusinessSchema,
} from '@/lib/seo/schema';
import { getSiteSettings } from '@/lib/sanity/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Moore Newton | San Leandro Hardwood Dist.',
  description:
    'Visit, call, or message Moore Newton. 2115 Williams Street, San Leandro, CA. Open M–F, 8 AM–4:30 PM. Next-day Bay Area delivery from $500, no fee at $750+ commercial.',
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
          title: 'Contact Moore Newton',
          description: 'Contact Moore Newton Hardwoods in San Leandro, California.',
        })}
      />
      {siteSettings && <JsonLd data={buildLocalBusinessSchema(siteSettings)} />}

      {/* Hero */}
      <PageHero
        eyebrow="Contact"
        title="Contact Moore Newton."
        subhead="Check stock. Get a quote. Spec out a project. Send us a message and our sales team will reply within 24 hours."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Contact' }]}
      />

      {/* Contact Sales */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Contact Sales</Eyebrow>
          <H2 className="mb-6">Talk to our sales team.</H2>
          <Body className="mb-8">
            Check stock. Get a quote. Spec out a project. Send us a message and our sales team will
            reply within 24 hours.
          </Body>

          <ContactForm />

          <Body className="mt-4 text-sm text-muted">
            We respond within one business day. New-customer inquiries route directly to our
            operations lead.
          </Body>
        </div>
      </section>

      {/* Call In */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Call In</Eyebrow>
          <H2 className="mb-6">
            <a href="tel:+15103176500" className="hover:text-accent">
              (510) 317-6500
            </a>
          </H2>
          <Body>
            Monday through Friday, 8:00 AM to 4:30 PM Pacific. For anything beyond a quick inventory
            question — cutlists, project specs, delivery scheduling — please use the contact form
            above. It routes directly to our sales team and gives us the detail we need to turn a
            quote around faster.
          </Body>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Come See Us</Eyebrow>
          <H2 className="mb-6">2115 Williams Street, San Leandro, CA 94577.</H2>
          <Body className="mb-6">
            Our facility is open for browsing and customer pickup Monday through Friday, 8:00 AM to
            4:30 PM. Pull into the Williams Street gate, check in at the sales counter, and
            we&apos;ll point you to the aisle or help you pull an order. No appointment required.
          </Body>
          <Body className="mb-6">
            First-time visitors: we&apos;ll set up a customer account for you when you arrive.
            Having an account on file means faster pickup next time and unlocks delivery when you
            need it.
          </Body>

          <div className="mb-6">
            <Body className="mb-2">
              <strong>Moore Newton Hardwoods</strong>
            </Body>
            <Body>
              2115 Williams Street
              <br />
              San Leandro, CA 94577
            </Body>
          </div>

          <Body className="mb-6">
            <strong>Hours:</strong>
            <br />
            Monday–Friday: 8:00 AM – 4:30 PM
            <br />
            Closed Saturday, Sunday, and major U.S. holidays
          </Body>

          <a
            href="https://maps.google.com/?q=2115+Williams+Street+San+Leandro+CA+94577"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded hover:bg-emphasis transition-colors"
          >
            Get Directions
          </a>
        </div>
      </section>

      {/* Pickup & Delivery */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Pick Up Today, or Have It Delivered Tomorrow</Eyebrow>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-canvas p-6 rounded-lg">
              <H3 className="text-base mb-4">Will-Call Pickup</H3>
              <ul className="space-y-2 text-body list-disc pl-6">
                <li>
                  Available Monday–Friday, 8:00 AM to 4:30 PM at our Williams Street facility.
                </li>
                <li>No minimum order. Any quantity, any species.</li>
                <li>Open to anyone. First-time buyers, we&apos;ll set up a customer account at the counter.</li>
                <li>Forklift loading available for heavy orders.</li>
              </ul>
            </div>
            <div className="bg-canvas p-6 rounded-lg">
              <H3 className="text-base mb-4">Next-Day Delivery</H3>
              <ul className="space-y-2 text-body list-disc pl-6">
                <li>
                  <strong>$50 flat delivery fee</strong> on orders $500 and up, placed by 4:30 PM
                  Pacific.
                </li>
                <li>
                  <strong>No delivery fee</strong> on orders over $750 to commercial addresses;{' '}
                  <strong>$35 reduced fee</strong> on orders over $750 to residential addresses.
                </li>
                <li>
                  Delivery area: San Francisco, Oakland, Berkeley, San Jose, San Rafael, Palo Alto,
                  Walnut Creek, Fremont, Hayward, Daly City, Santa Cruz, Salinas/Carmel, and the
                  surrounding Greater Bay Area. Clear Lake weekly (Wednesdays). Sacramento and the
                  foothills on a 2–3 day schedule. LTL freight (including U.S. military bases) on
                  request.
                </li>
                <li>Orders below $500 are will-call only.</li>
              </ul>
            </div>
          </div>

          <Body className="mt-6">
            <Link href="/delivery" className="text-accent hover:text-emphasis underline">
              Full Delivery Details →
            </Link>
          </Body>
        </div>
      </section>

      {/* Follow Us */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Instagram</Eyebrow>
          <Body className="mb-4">See what&apos;s on the floor and what&apos;s going out the door.</Body>
          <Body>
            <a
              href="https://www.instagram.com/moorenewtonhardwoods"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-emphasis underline"
            >
              @moorenewtonhardwoods →
            </a>
          </Body>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        heading="Ready to get a quote?"
        body="The fastest way to get pricing on a specific cutlist or project is through the quote form — it routes the request straight to our sales team with all the detail we need."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Contact Sales →', href: '#contact-sales', variant: 'secondary' }}
      />
    </>
  );
}
