import type { Metadata } from 'next';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Bay Area Hardwood Delivery | Next-Day | Moore Newton',
  description:
    "Hardwood lumber delivery across the Bay Area from our San Leandro facility. $500 minimum, $50 fee; $750+ ships no-fee commercial or $35 residential. Will-call no minimum.",
  path: '/delivery',
});

const faqItems = [
  {
    question: 'Do you charge a fuel surcharge?',
    answer:
      "No. The delivery fee structure is flat — $50 under $750, no fee to commercial over $750, $35 to residential over $750. No separate fuel surcharge, no per-mile upcharges within the standard zone. Out-of-zone and LTL orders are quoted individually.",
  },
  {
    question: 'Can I split a delivery across two addresses?',
    answer:
      'Yes, on request. Each address is treated as its own stop; pricing adjusts by distance and total delivery time.',
  },
  {
    question: 'Do you deliver to job sites without a forklift or a dock?',
    answer:
      "Yes, but plan the off-load. Our trucks don't have liftgates, so either the customer meets the truck with a forklift or the driver and customer hand-offload together. Let us know at the order stage so the driver arrives expecting to hand-offload.",
  },
  {
    question: 'How much lead time do I need for a delivery outside the standard zone?',
    answer:
      'Varies by destination. Santa Cruz and Salinas/Carmel ship daily. Clear Lake ships every Wednesday (orders must be in by Tuesday). Sacramento, Stockton, Modesto, and the foothills ship in 2–3 business days. LTL and long-haul destinations are confirmed at the quote stage.',
  },
  {
    question: 'Can I get a 2-hour delivery window?',
    answer:
      "We run morning and afternoon windows, not 2-hour windows. If a specific window is required (crane scheduled, foreman present, tight job-site schedule), ask the dispatcher — we can sometimes route to a tighter arrival, but the two-window default is what our facility schedules against.",
  },
  {
    question: 'Can I track my delivery?',
    answer:
      "Not via a live tracking tool. Call our facility the morning of delivery and dispatch will give you the driver's rough route position and an ETA window.",
  },
  {
    question: "What if there's an issue with my delivery?",
    answer:
      'Call our facility as soon as you notice — quantity shortage, damaged material, wrong species, anything. Most issues resolve the same day; complex corrections are confirmed within 24 hours. A representative must be onsite at delivery to sign off on quantity and condition.',
  },
  {
    question: 'Do you deliver on weekends?',
    answer:
      'No. The fleet runs Monday through Friday. No Saturday, Sunday, holiday, or rush/after-hours delivery.',
  },
  {
    question: 'Do you ship to U.S. military bases or overseas?',
    answer:
      'Yes, via LTL freight. Domestic military bases and overseas APO/FPO addresses are handled through our LTL network. Confirm pricing and transit at the quote stage.',
  },
  {
    question: 'Is there a minimum order for delivery?',
    answer:
      'Yes — $500. Orders below $500 are will-call at our Williams Street facility (no minimum).',
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
        eyebrow="Delivery & Will-Call"
        title="Delivery."
        subhead="Next-day delivery across the Bay Area from our San Leandro facility. $500 order minimum with a $50 delivery fee; orders over $750 ship no-fee to commercial addresses and at a reduced $35 residential fee. Will-call at our facility, no minimum."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Delivery' }]}
      />

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">The Short Version</Eyebrow>
          <H2 className="mb-6">Three ways to get your material.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">1. Standard delivery — $50 fee, $500 minimum.</H3>
              <Body>
                Orders of $500 and up placed by <strong>4:30 PM Pacific</strong> ship the next
                business day across our standard Bay Area zone. Flat $50 delivery fee; no per-mile
                upcharges within the zone.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">
                2. Over $750 — no fee to commercial addresses, $35 to residential.
              </H3>
              <Body>
                Orders of $750 and up ship to commercial addresses (builders, job sites, warehouses,
                loading docks) with no delivery fee. Residential addresses over $750 ship at a
                reduced <strong>$35 fee</strong> — residential deliveries carry additional logistics
                (no dock, limited loading help, street access) that the reduced fee covers.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">3. Will-call — no minimum.</H3>
              <Body>
                Pick up at our Williams Street facility in San Leandro. Drive in, pull up to the
                dock, load out. No order minimum for will-call. Facility hours in §5 below.
              </Body>
            </div>
          </div>

          <Body className="mt-6">
            <strong>Long-haul and out-of-zone orders</strong> ship via LTL freight, including to
            U.S. military bases and overseas APO/FPO addresses. See §3 below.
          </Body>
        </div>
      </section>

      {/* Delivery Zone */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Coverage</Eyebrow>
          <H2 className="mb-6">The Bay Area, plus a scheduled long-haul slate.</H2>

          <Body className="mb-4">
            <strong>Standard (daily) zone — next-business-day from San Leandro:</strong>
          </Body>

          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>East Bay</strong> — Oakland, Berkeley, Emeryville, Alameda, Hayward, Union
              City, Fremont, Newark, Castro Valley, San Lorenzo, San Leandro, Albany, El Cerrito,
              Richmond, Pinole, Hercules, Rodeo.
            </li>
            <li>
              <strong>San Francisco</strong> — all neighborhoods, loading-zone access permitting.
            </li>
            <li>
              <strong>Peninsula</strong> — Daly City, South San Francisco, San Bruno, Millbrae,
              Burlingame, San Mateo, Foster City, Belmont, San Carlos, Redwood City, Menlo Park,
              Atherton, Palo Alto.
            </li>
            <li>
              <strong>South Bay</strong> — Mountain View, Los Altos, Sunnyvale, Cupertino, Santa
              Clara, San Jose (north and central), Los Gatos.
            </li>
            <li>
              <strong>North Bay (by route)</strong> — San Rafael, Mill Valley, Sausalito, Larkspur,
              Corte Madera, Tiburon; Marin County further north on request.
            </li>
            <li>
              <strong>Santa Cruz / Monterey corridor</strong> — Santa Cruz and Salinas/Carmel on a{' '}
              <strong>daily</strong> route.
            </li>
          </ul>

          <Body className="mb-4">
            <strong>Weekly scheduled zone:</strong>
          </Body>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>Clear Lake / Lake County</strong> — every <strong>Wednesday</strong>. Orders
              for the Clear Lake run must be placed by end-of-day Tuesday.
            </li>
          </ul>

          <Body className="mb-4">
            <strong>Extended zone (2–3 business days):</strong>
          </Body>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>Sacramento, Stockton, Modesto, and the Sierra foothills</strong> ship on a
              scheduled basis with 2–3 business day turnaround from order confirmation.
            </li>
          </ul>

          <Body className="mb-4">
            <strong>LTL freight and long-haul:</strong>
          </Body>
          <ul className="space-y-2 text-body list-disc pl-6">
            <li>
              Orders shipping outside the scheduled Bay Area and Central California zones ship via{' '}
              <strong>LTL freight</strong>, including to <strong>U.S. military bases</strong>{' '}
              (domestic and overseas via APO/FPO) and to destinations further afield in the
              continental U.S. LTL pricing and transit are confirmed at the quote stage.
            </li>
          </ul>
        </div>
      </section>

      {/* Scheduling */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Timing</Eyebrow>
          <H2 className="mb-6">Next-day is the default. Standard windows, standard cutoffs.</H2>

          <Body className="mb-6">
            <strong>Standard lead time:</strong> Orders confirmed by{' '}
            <strong>4:30 PM Pacific, Monday through Friday</strong>, ship the next business day.
            Material arrives during business hours.
          </Body>

          <Body className="mb-6">
            <strong>Delivery windows:</strong> Deliveries arrive in a morning or afternoon window —
            we don&apos;t schedule to a specific two-hour window and we don&apos;t do same-day
            delivery under any circumstances. The dispatcher and the customer agree on AM vs PM at
            the time the order is confirmed, and the driver targets that window.
          </Body>

          <Body className="mb-6">
            <strong>Same-day delivery:</strong> Not offered. We ship on a next-business-day rhythm;
            same-day isn&apos;t a service we provide.
          </Body>

          <Body className="mb-6">
            <strong>Rush, weekends, holidays:</strong> Deliveries do not run Saturdays, Sundays, or
            federal holidays. We don&apos;t offer after-hours or rush-route delivery outside of our
            standard schedule. Orders placed over the weekend ship Monday.
          </Body>

          <Body>
            <strong>Outside-zone lead time:</strong> Santa Cruz and Salinas/Carmel ship daily with
            the rest of the standard zone. Clear Lake ships weekly on Wednesdays — orders for the
            Clear Lake run must be confirmed by end-of-day Tuesday. Sacramento, Stockton, Modesto,
            and the foothills ship in 2–3 business days. LTL and long-haul timing is confirmed at
            quote.
          </Body>
        </div>
      </section>

      {/* Will-Call */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Will-Call & Facility Pickup</Eyebrow>
          <H2 className="mb-6">Drive in. Pull up. Load out.</H2>

          <Body className="mb-6">
            Our Williams Street facility in San Leandro is open to pickup customers{' '}
            <strong>Monday through Friday, 8:00 AM – 4:30 PM</strong>. No order minimum for
            will-call; walk-ins, trade accounts, and call-ahead pickups are all welcome.
          </Body>

          <Body className="mb-6">
            <strong>Facility hours:</strong>
            <br />
            Monday–Friday: <strong>8:00 AM – 4:30 PM</strong>
            <br />
            Saturday: closed
            <br />
            Sunday: closed
          </Body>

          <H3 className="text-base mb-4">Before you come:</H3>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              Pick-your-own selection happens at the counter on arrival.{' '}
              <strong>We don&apos;t pre-pull will-call orders</strong> — customers select their own
              boards and sheets from inventory. For builders that know the species and grade and
              just want to load out fast, facility crew will point you to the aisle and help with
              loading.
            </li>
            <li>
              Trade customers with accounts can charge to the account at the counter; cash, check,
              and card accepted for walk-ins.
            </li>
            <li>
              Trucks, trailers, and pickups all fit the dock. Larger rigs welcome — give us a
              heads-up so we have dock space clear.
            </li>
          </ul>

          <Body>
            <strong>Loading:</strong> The facility crew handles forklift loading for anything that
            fits on a pallet or bunk. For irregular loads or oversized boards, customers are welcome
            to rig the load themselves with crew assistance.
          </Body>
        </div>
      </section>

      {/* Delivery Logistics */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">What to Expect</Eyebrow>
          <H2 className="mb-6">How the delivery actually lands.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">No liftgates on our delivery fleet.</H3>
              <Body>
                Our trucks are flatbeds and box trucks without liftgates. For off-loading, either
                (a) the customer meets the truck with a forklift, or (b) the driver and the customer
                hand-offload lumber and sheet goods together. Plan the off-load in advance — letting
                the driver show up to a residential curb with no forklift and no help doesn&apos;t
                work.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Customer signature required.</H3>
              <Body>
                A representative must be onsite to sign for the delivery. The driver doesn&apos;t
                leave material unattended; if no one is available to sign, the driver reschedules
                the delivery and the customer pays the round-trip.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">No delivery tracking in real time.</H3>
              <Body>
                We don&apos;t run live tracking. For a delivery ETA, call our facility on the
                morning of delivery and dispatch will give you the driver&apos;s rough position on
                the route.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Residential deliveries.</H3>
              <Body>
                Residential addresses over $750 deliver at a reduced $35 fee. For residential
                addresses under $500, will-call at our facility is the path — the residential
                delivery fee structure isn&apos;t set up to handle below-minimum orders.
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
        body="Request a quote and we'll confirm stock, pricing, and delivery within one business day."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Contact Sales →', href: '/contact', variant: 'secondary' }}
      />
    </>
  );
}
