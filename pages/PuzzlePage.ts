import { expect, type Page } from '@playwright/test';
import { acceptPrivacyConsentIfPresent } from '../utils/consentUtils';
import { buildChessUrl } from '../utils/urlUtils';

export class PuzzlePage {
  readonly page: Page;
  private readonly path = '/puzzles';
  private readonly title = /Chess Puzzles/;
  private readonly ratedPath = '/puzzles/rated';

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

  async dismissFirstTimeModalIfPresent(): Promise<void> {
    const okButton = this.page.getByRole('button', { name: 'Ok' });

    if (await okButton.isVisible({ timeout: 1500 }).catch(() => false)) {
      await okButton.click();
    }
  }

  async expectPuzzleHeaderVisible(): Promise<void> {
    await expect(
      this.page.locator('#sidebar').getByRole('heading', {
        name: 'Puzzles',
        exact: true
      })
    ).toBeVisible();
  }

  async startRatedPuzzle(): Promise<void> {
    await this.dismissFirstTimeModalIfPresent();
    await this.page.getByRole('button', { name: 'Solve Puzzles' }).click();
  }

  async expectRatedPuzzleBoardLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(this.ratedPath));
    await expect(this.page.locator('.board')).toBeVisible();
  }

}
