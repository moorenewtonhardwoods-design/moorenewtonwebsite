import type { Metadata } from 'next';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { QuoteForm } from '@/components/forms';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildBreadcrumbListSchema,
  buildSimpleFAQPageSchema,
  buildContactPointSchema,
} from '@/lib/seo/schema';
import { getSiteSettings } from '@/lib/sanity/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Request a Quote | Moore Newton Hardwoods | San Leandro',
  description:
    "Send Moore Newton a cutlist or project description. We respond within one business day with pricing, availability, and a Bay Area delivery estimate.",
  path: '/quote',
});

const faqItems = [
  {
    question: 'How quickly will I hear back?',
    answer:
      'Within one business day. Most quotes come back the same day. For urgent orders, call us at (510) 317-6500 — phone is the fastest channel.',
  },
  {
    question: 'Do you have a minimum order?',
    answer:
      'For will-call pickup at our facility: no minimum. For delivery: $500 minimum with a flat $50 delivery fee. Orders over $750 ship with no delivery fee to commercial addresses and at a reduced $35 fee to residential addresses.',
  },
  {
    question: 'Can I get a quote on custom millwork?',
    answer:
      "Yes. Submit the form with a profile drawing, a sketch, or a sample, and we'll quote linear footage, pricing, and lead time. Standard turnaround on custom knives is 5–7 business days.",
  },
  {
    question: 'Do you sell to the public, or trade-only?',
    answer:
      'We sell to anyone. Our orientation is wholesale — our inventory, grading, and pricing are geared to trade buyers — but will-call pickup is open to any customer, with no minimum order.',
  },
  {
    question: 'Can I see the material before I buy?',
    answer:
      "Yes. Visit us during business hours and we'll pull samples or walk you through the inventory. For quotes on specific boards or sorts, tell us what you're after in the message and we can pull samples ahead of your visit.",
  },
  {
    question: 'Do you offer credit terms or accounts receivable?',
    answer:
      "Account-based terms are available to qualifying commercial customers. If you'd like a credit application, mention it in your quote request and we'll send the application separately.",
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
        eyebrow="Quotes"
        title="Request a Quote."
        subhead="Send us a cutlist, a drawing, or a description of what you're working on. We respond within one business day with pricing, availability, and a delivery estimate."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Quote' }]}
      />

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">The Process</Eyebrow>
          <H2 className="mb-6">Three steps to a quote.</H2>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <H3 className="text-base mb-2">1. Tell us what you need.</H3>
              <Body>
                Submit the form below with your contact info, industry, and a description of the
                project. Attach a cutlist, drawing, or profile sample in the message if you have one
                — paste it in directly, or email it as a follow-up to info@moorenewton.com.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">2. We price it.</H3>
              <Body>
                Your request routes straight to our sales team. We check stock, confirm grade and
                specifications, price the line items, and run a delivery estimate if you&apos;re in
                the Bay Area. Most quotes go back the same day; all quotes go back within one
                business day.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">3. You order.</H3>
              <Body>
                If the quote works, reply to confirm — or call us at (510) 317-6500. We schedule
                delivery or set up will-call pickup, and the order goes out. Returning customers on
                file move faster; first-time customers, we&apos;ll set up an account at the same
                time.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Request Form</Eyebrow>
          <H2 className="mb-6">Send us your project.</H2>

          <QuoteForm />

          <Body className="mt-4 text-sm text-muted">
            We respond within one business day. For faster turnaround on urgent orders, call us at{' '}
            <a href="tel:+15103176500" className="text-accent hover:text-emphasis underline">
              (510) 317-6500
            </a>
            .
          </Body>
        </div>
      </section>

      {/* What to Include */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Make It Easy on Yourself</Eyebrow>
          <H2 className="mb-6">What helps us quote faster.</H2>
          <Body className="mb-6">
            The more specific your request, the faster and more accurate the quote. The detail that
            helps most:
          </Body>

          <ul className="space-y-3 text-body list-disc pl-6">
            <li>
              <strong>Species and grade</strong> — &quot;4/4 FAS walnut&quot; beats &quot;some
              walnut.&quot; If you don&apos;t know the grade, say what you&apos;re building and
              we&apos;ll recommend.
            </li>
            <li>
              <strong>Thickness and width</strong> — rough or surfaced (S3S, S4S), and any width or
              length minimums.
            </li>
            <li>
              <strong>Quantity</strong> — board feet, linear feet, or number of boards. A rough
              count is fine.
            </li>
            <li>
              <strong>Delivery or pickup</strong> — and your delivery ZIP if you want a delivery
              estimate.
            </li>
            <li>
              <strong>Timeline</strong> — when you need it. Most orders ship next-day; custom
              millwork runs 5–7 business days.
            </li>
          </ul>

          <Body className="mt-6">
            If you have a cutlist or a drawing, paste it into the message or email it separately to
            info@moorenewton.com.
          </Body>
        </div>
      </section>

      {/* Delivery & Pickup */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">How You Get It</Eyebrow>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-canvas p-6 rounded-lg">
              <H3 className="text-base mb-4">Will-Call Pickup</H3>
              <ul className="space-y-2 text-body list-disc pl-6">
                <li>
                  Available Monday–Friday, 8:00 AM – 4:30 PM at our Williams Street facility in San
                  Leandro.
                </li>
                <li>No minimum order.</li>
                <li>First-time customers: we set up an account at the counter.</li>
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
                  <strong>No delivery fee</strong> on commercial orders over $750. Residential
                  orders over $750 ship at a reduced <strong>$35 fee</strong>.
                </li>
                <li>Orders below $500 are will-call only.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Common Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Prefer to talk it through?"
        body="Call us at (510) 317-6500 Monday through Friday, 8:00 AM to 4:30 PM. Or visit 2115 Williams Street, San Leandro — no appointment required."
        primaryCta={{ label: 'Call Us', href: 'tel:+15103176500', variant: 'primary' }}
        secondaryCta={{ label: 'Visit Us →', href: '/contact', variant: 'secondary' }}
      />
    </>
  );
}
