import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('displays all required fields', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();

    await expect(page.getByRole('button', { name: /send|submit|contact/i })).toBeVisible();
  });

  test('shows validation errors for empty required fields', async ({ page }) => {
    await page.goto('/contact');

    await page.getByRole('button', { name: /send|submit|contact/i }).click();

    await expect(page.getByText(/first name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
  });
});

test.describe('Quote Form', () => {
  test('displays all required fields', async ({ page }) => {
    await page.goto('/quote');

    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/company/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/industry/i)).toBeVisible();
    await expect(page.getByLabel(/project details|message/i)).toBeVisible();

    await expect(page.getByRole('button', { name: /request quote|submit/i })).toBeVisible();
  });

  test('submits successfully and redirects to thank-you page', async ({ page }) => {
    await page.goto('/quote');

    await page.getByLabel(/first name/i).fill('Playwright');
    await page.getByLabel(/last name/i).fill('TestBot');
    await page.getByLabel(/company/i).fill('Playwright Test Company');
    await page.getByLabel(/email/i).fill('playwright-test@example.com');
    await page.getByLabel(/phone/i).fill('555-0199');
    await page.getByLabel(/industry/i).selectOption({ index: 1 });
    await page
      .getByLabel(/project details|message/i)
      .fill('[PLAYWRIGHT-TEST] This is an automated test submission. Please delete this record.');

    await page.getByRole('button', { name: /request quote|submit/i }).click();

    await page.waitForURL('**/quote/thank-you', { timeout: 10000 });

    await expect(page).toHaveURL(/\/quote\/thank-you/);
    await expect(page.locator('h1')).toContainText(/thank you|received/i);
  });

  test('shows validation errors for empty required fields', async ({ page }) => {
    await page.goto('/quote');

    await page.getByRole('button', { name: /request quote|submit/i }).click();

    await expect(page.getByText(/first name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
  });
});
