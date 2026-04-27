import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation/contact';
import { submitForm, buildField, normalizeEmail } from '@/lib/hubspot/client';

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '';
const FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID ?? '';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'rate_limit', message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'invalid_json', message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((e) => ({
      field: String(e.path.join('.')),
      message: e.message,
    }));
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website && data.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  if (!PORTAL_ID || !FORM_ID) {
    console.error('[Contact Form] Missing PORTAL_ID or FORM_ID environment variables');
    return NextResponse.json(
      { error: 'server', message: 'Form configuration error.' },
      { status: 500 }
    );
  }

  const fields = [
    buildField('firstname', data.firstname),
    buildField('lastname', data.lastname),
    buildField('email', normalizeEmail(data.email)),
    buildField('message', data.message),
  ];

  if (data.company) {
    fields.push(buildField('company', data.company));
  }

  if (data.phone) {
    fields.push(buildField('phone', data.phone));
  }

  const pageUri = request.headers.get('referer') ?? undefined;

  const result = await submitForm({
    portalId: PORTAL_ID,
    formId: FORM_ID,
    fields,
    context: {
      pageUri,
      pageName: 'Contact Sales',
      ipAddress: ip !== 'unknown' ? ip : undefined,
    },
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
