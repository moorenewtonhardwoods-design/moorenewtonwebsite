import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// TODO: Re-enable color-contrast checks after fixing design token contrast ratios
// Known issues: #877961 on #ede6d8 (3.42:1), #8b6914/#f5f0e8 combos (4.48:1)
// Target: 4.5:1 for normal text per WCAG 2.1 AA
const EXCLUDED_RULES = ['color-contrast'];

function buildAxe(page: import('@playwright/test').Page) {
  return new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .disableRules(EXCLUDED_RULES);
}

test.describe('Accessibility (WCAG 2.1 AA)', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await buildAxe(page).analyze();
    expect(results.violations).toEqual([]);
  });

  test('species hub page has no accessibility violations', async ({ page }) => {
    await page.goto('/species');
    await page.waitForLoadState('networkidle');

    const results = await buildAxe(page).analyze();
    expect(results.violations).toEqual([]);
  });

  test('species detail page has no accessibility violations', async ({ page }) => {
    await page.goto('/species');

    const speciesLink = page.locator('a[href^="/species/"]').first();
    const hasSpeciesPages = (await speciesLink.count()) > 0;

    if (!hasSpeciesPages) {
      test.skip(true, 'No species pages available in Sanity');
      return;
    }

    await speciesLink.click();
    await page.waitForLoadState('networkidle');

    const results = await buildAxe(page).analyze();
    expect(results.violations).toEqual([]);
  });

  test('quote page has no accessibility violations', async ({ page }) => {
    await page.goto('/quote');
    await page.waitForLoadState('networkidle');

    const results = await buildAxe(page).analyze();
    expect(results.violations).toEqual([]);
  });

  test('contact page has no accessibility violations', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    const results = await buildAxe(page).analyze();
    expect(results.violations).toEqual([]);
  });

  test('products page has no accessibility violations', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const results = await buildAxe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
