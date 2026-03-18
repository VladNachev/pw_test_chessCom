import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Chess.com home page', () => {
  test('loads and shows the expected title', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.expectTitle();
  });
});
