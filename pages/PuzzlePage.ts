import { expect, type Page } from '@playwright/test';
import { acceptPrivacyConsentIfPresent } from '../utils/consentUtils';

export class PuzzlePage {
  readonly page: Page;
  private readonly path = '/puzzles';
  private readonly title = /Chess Puzzles/;

  constructor(page: Page) {
    this.page = page;
  }

  async expectUrlAndTitleLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(this.path);
    await expect(this.page).toHaveTitle(this.title);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.dismissPrivacyConsentIfPresent();
    await this.expectUrlAndTitleLoaded();
  }

  async dismissPrivacyConsentIfPresent(): Promise<void> {
    await acceptPrivacyConsentIfPresent(this.page);
  }

  async expectPuzzleHeaderVisible(): Promise<void> {
    await expect(
      this.page.locator('#sidebar').getByRole('heading', {
        name: 'Puzzles',
        exact: true
      })
    ).toBeVisible();
  }

}
