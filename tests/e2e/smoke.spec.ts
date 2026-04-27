import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage renders with H1, header, and footer', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('species hub page renders', async ({ page }) => {
    await page.goto('/species');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/species/i);
  });

  test('species detail page renders with Specs and Related Species', async ({ page }) => {
    await page.goto('/species');

    const speciesLink = page.locator('a[href^="/species/"]').first();
    const hasSpeciesPages = await speciesLink.count() > 0;

    if (!hasSpeciesPages) {
      test.skip(true, 'No species pages available in Sanity');
      return;
    }

    await speciesLink.click();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toBeVisible();

    const specsSection = page.getByRole('heading', { name: /specs|specifications/i });
    await expect(specsSection).toBeVisible();

    const relatedSection = page.getByRole('heading', { name: /related species/i });
    await expect(relatedSection).toBeVisible();
  });

  test('product hub page renders', async ({ page }) => {
    await page.goto('/products');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/products/i);
  });

  test('404 page renders for invalid route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-12345');

    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/not found|404/i);
  });

  test('/robots.txt returns 200', async ({ request }) => {
    const response = await request.get('/robots.txt');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/plain');

    const body = await response.text();
    expect(body).toContain('User-agent');
    expect(body).toContain('Sitemap');
    expect(body).toContain('/studio');
  });

  test('/sitemap.xml returns 200 with expected URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/xml');

    const body = await response.text();
    expect(body).toContain('<?xml');
    expect(body).toContain('<urlset');

    const urlMatches = body.match(/<loc>/g);
    expect(urlMatches).not.toBeNull();
    expect(urlMatches!.length).toBeGreaterThanOrEqual(5);

    expect(body).toContain('/about');
    expect(body).toContain('/contact');
    expect(body).toContain('/quote');
    expect(body).toContain('/species');
    expect(body).toContain('/products');
  });
});
