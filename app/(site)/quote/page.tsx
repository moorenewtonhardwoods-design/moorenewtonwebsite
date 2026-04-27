import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { FormPlaceholder } from '@/components/FormPlaceholder';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildBreadcrumbListSchema,
  buildSimpleFAQPageSchema,
  buildContactPointSchema,
} from '@/lib/seo/schema';
import { getSiteSettings } from '@/lib/sanity/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Request a Quote | Moore Newton Hardwoods | Bay Area',
  description:
    'Request a quote for hardwood lumber, plywood, or millwork from Moore Newton. We respond within one business day with pricing, availability, and lead time.',
  path: '/quote',
});

const faqItems = [
  {
    question: 'How quickly will I get a quote?',
    answer:
      'We respond to quote requests within one business day. For urgent requests, call the sales desk directly at (510) 352-1855.',
  },
  {
    question: 'What information do I need to include?',
    answer:
      'At minimum: species, dimensions (thickness, width, length), quantity, and grade if you have a preference. The more detail you provide — including project context, delivery location, and timeline — the more accurate the quote.',
  },
  {
    question: "Can I request material I don't see on your website?",
    answer:
      "Yes. If we don't stock it, we can often source it through our mill network. Include the species and specifications in your quote request and we'll let you know availability and lead time.",
  },
  {
    question: 'Is there a minimum order?',
    answer:
      'No minimum order for stock items. Buy one board or a truckload. Millwork orders may have minimums depending on the service (custom profile runs, glue-ups, etc.).',
  },
  {
    question: 'How long is a quote valid?',
    answer:
      'Quotes are typically valid for 7–14 days, depending on market conditions and stock levels. The quote will specify the validity period.',
  },
  {
    question: 'Can I modify a quote after I receive it?',
    answer:
      "Yes. If you need to adjust quantities, add items, or change specifications, reply to the quote email and we'll revise it.",
  },
];

export default async function QuotePage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Quote', path: '/quote' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />
      {siteSettings && <JsonLd data={buildContactPointSchema(siteSettings)} />}

      {/* Hero */}
      <PageHero
        eyebrow="Quote"
        title="Request a Quote."
        subhead="Tell us what you need — species, dimensions, quantity — and we'll get back to you within one business day with pricing, availability, and lead time."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Quote' }]}
      />

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">How It Works</Eyebrow>
          <H2 className="mb-6">Three steps to your quote.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">1. Submit your request.</H3>
              <Body>
                Fill out the form below with your material requirements. Include as much detail as
                you have — species, dimensions, grade, quantity, and any project context that helps
                us understand what you need.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">2. We review and quote.</H3>
              <Body>
                Our sales team reviews your request, checks stock, and prepares a detailed quote
                with pricing, availability, and estimated lead time.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">3. You receive the quote.</H3>
              <Body>
                We send the quote to your email within one business day. Review it, ask questions,
                request modifications, or place the order — your call.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Quote Form</Eyebrow>
          <H2 className="mb-6">Tell us what you need.</H2>
          <Body className="mb-8">
            Fill out the form below and we&apos;ll get back to you within one business day. For
            urgent requests, call the sales desk directly at{' '}
            <a href="tel:+15103521855" className="text-accent hover:text-emphasis underline">
              (510) 352-1855
            </a>
            .
          </Body>

          <FormPlaceholder formName="quote" />
        </div>
      </section>

      {/* What to Include */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">What to Include</Eyebrow>
          <H2 className="mb-6">The more detail, the better the quote.</H2>
          <Body className="mb-6">
            A complete quote request helps us give you accurate pricing and availability.
            Here&apos;s what to include:
          </Body>

          <ul className="space-y-3 text-body list-disc pl-6">
            <li>
              <strong>Species</strong> — The wood species you need (e.g., white oak, walnut, sapele).
            </li>
            <li>
              <strong>Dimensions</strong> — Thickness, width, and length. For rough lumber, specify
              4/4, 5/4, 6/4, 8/4, etc. For S4S or millwork, specify final dimensions.
            </li>
            <li>
              <strong>Quantity</strong> — Board feet for lumber, number of panels for plywood, linear
              feet for moulding.
            </li>
            <li>
              <strong>Grade</strong> — If you have a preference (FAS, Select, #1 Common, etc.). If
              not, we&apos;ll recommend based on your application.
            </li>
            <li>
              <strong>Application</strong> — What the material is for (furniture, cabinets, flooring,
              etc.). Helps us recommend the right grade and cut.
            </li>
            <li>
              <strong>Timeline</strong> — When you need the material. Rush timelines are possible for
              many items.
            </li>
            <li>
              <strong>Delivery or pickup</strong> — Whether you want delivery (include address) or
              will-call pickup.
            </li>
          </ul>
        </div>
      </section>

      {/* Delivery & Pickup */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Delivery & Pickup</Eyebrow>
          <H2 className="mb-6">How you&apos;ll receive your order.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">Local delivery</H3>
              <Body>
                We deliver throughout the Bay Area and Northern California. Delivery pricing is
                based on zone and order size — included in your quote. Typical lead time is 2–5
                business days.{' '}
                <Link href="/delivery" className="text-accent hover:text-emphasis underline">
                  See delivery zones →
                </Link>
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Will-call pickup</H3>
              <Body>
                Pick up your order at our San Leandro loading dock. Most stock orders are ready
                within a few hours of confirmation. Loading dock hours: Monday–Friday, 7:00 AM–4:30
                PM.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Freight shipping</H3>
              <Body>
                For locations outside our delivery zone, we can arrange freight shipping via common
                carrier. Mention it in your quote request and we&apos;ll include freight pricing.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Frequently Asked Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Prefer to talk?"
        body="Call our sales desk directly for stock checks, quick quotes, or project discussions."
        primaryCta={{ label: 'Call (510) 352-1855', href: 'tel:+15103521855', variant: 'primary' }}
        secondaryCta={{ label: 'Contact Us →', href: '/contact', variant: 'secondary' }}
      />
    </>
  );
}
