import { expect, type Page } from '@playwright/test';
import { homePageData } from '../test-data/homePageData';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async expectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(homePageData.titlePattern);
  }

  async clickSignUp(): Promise<void> {
    await this.page.getByRole('link', { name: /sign up/i }).first().click();
  }

  async expectMainCtasVisible(): Promise<void> {
    for (const cta of homePageData.mainCtas) {
      await expect(this.page.getByRole('link', { name: cta }).first()).toBeVisible();
    }
  }

  async clickPlay(): Promise<void> {
    await this.page.locator('a[href="/play"], a[href="https://www.chess.com/play"]').first().click();
  }
}
