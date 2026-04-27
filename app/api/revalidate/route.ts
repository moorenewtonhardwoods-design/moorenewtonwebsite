import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface SanityWebhookPayload {
  _type: string;
  _id: string;
  slug?: { current?: string };
}

function verifySignature(body: string, signature: string | null): boolean {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error('[revalidate] SANITY_REVALIDATE_SECRET is not set');
    return false;
  }

  if (!signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

function getRevalidationTargets(payload: SanityWebhookPayload): {
  paths: string[];
  tags: string[];
} {
  const { _type, slug } = payload;
  const slugValue = slug?.current;

  const paths: string[] = [];
  const tags: string[] = [];

  switch (_type) {
    case 'siteSettings':
    case 'navigation':
      tags.push('sanity:global');
      paths.push('/');
      break;

    case 'homePage':
      tags.push('sanity:home');
      paths.push('/');
      break;

    case 'aboutPage':
      tags.push('sanity:about');
      paths.push('/about');
      break;

    case 'contactPage':
      tags.push('sanity:contact');
      paths.push('/contact');
      break;

    case 'quotePage':
      tags.push('sanity:quote');
      paths.push('/quote');
      break;

    case 'deliveryPage':
      tags.push('sanity:delivery');
      paths.push('/delivery');
      break;

    case 'speciesPage':
      tags.push('sanity:species');
      paths.push('/species');
      if (slugValue) {
        tags.push(`sanity:species:${slugValue}`);
        paths.push(`/species/${slugValue}`);
      }
      break;

    case 'productPage':
      tags.push('sanity:products');
      paths.push('/products');
      if (slugValue) {
        tags.push(`sanity:product:${slugValue}`);
        paths.push(`/products/${slugValue}`);
      }
      break;

    case 'faqItem':
      tags.push('sanity:faq');
      paths.push('/quote', '/delivery');
      break;

    case 'industry':
      tags.push('sanity:industry');
      paths.push('/', '/about');
      break;

    default:
      console.log(`[revalidate] Unknown document type: ${_type}`);
  }

  return { paths, tags };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-sanity-signature');

    if (!verifySignature(body, signature)) {
      console.warn('[revalidate] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const payload: SanityWebhookPayload = JSON.parse(body);
    const { paths, tags } = getRevalidationTargets(payload);

    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    console.log(`[revalidate] ${payload._type}: tags=[${tags.join(', ')}] paths=[${paths.join(', ')}]`);

    return NextResponse.json({
      revalidated: true,
      type: payload._type,
      paths,
      tags,
    });
  } catch (error) {
    console.error('[revalidate] Error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
