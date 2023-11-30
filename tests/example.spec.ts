import { test, expect } from '@playwright/test';

test('visual testing', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveScreenshot();
  // Expect a title "to contain" a substring.
});
