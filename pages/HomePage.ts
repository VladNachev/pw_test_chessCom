import { expect, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  private readonly expectedTitlePattern = /Chess\.com\s*-\s*Play Chess Online/i;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async expectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(this.expectedTitlePattern);
  }
}
