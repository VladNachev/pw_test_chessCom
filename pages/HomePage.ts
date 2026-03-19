import { expect, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  private readonly titlePattern = /Chess\.com\s*-\s*Play Chess Online/i;
  private readonly mainCtas = ['Play', 'Puzzles', 'Learn', 'Train', 'Watch', 'Community', 'Other'];

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async expectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(this.titlePattern);
  }

  async clickSignUp(): Promise<void> {
    await this.page.getByRole('link', { name: /sign up/i }).first().click();
  }

  async clickLogIn(): Promise<void> {
    await this.page.getByRole('link', { name: /log in/i }).first().click();
  }

  async expectMainCtasVisible(): Promise<void> {
    for (const cta of this.mainCtas) {
      await expect(this.page.getByRole('link', { name: cta }).first()).toBeVisible();
    }
  }

  async clickPlay(): Promise<void> {
    await this.page.locator('a[href="/play"], a[href="https://www.chess.com/play"]').first().click();
  }
}
