export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) {
    return 'https://www.moorenewton.com';
  }
  if (envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
    return envUrl.replace(/\/$/, '');
  }
  return `https://${envUrl}`.replace(/\/$/, '');
}

export const SITE_URL = getSiteUrl();
