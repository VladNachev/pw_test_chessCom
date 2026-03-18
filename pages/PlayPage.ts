import { expect, type Page } from '@playwright/test';
import { playPageData } from '../test-data/playPageData';
import { acceptPrivacyConsentIfPresent } from '../utils/consentUtils';
import { buildChessUrl } from '../utils/urlUtils';

export class PlayPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectUrlAndTitleLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(playPageData.path));
    await expect(this.page).toHaveTitle(playPageData.title);
  }

  async goto(): Promise<void> {
    await this.page.goto(playPageData.path);
    await this.dismissPrivacyConsentIfPresent();
    await this.expectUrlAndTitleLoaded();
  }

  async dismissPrivacyConsentIfPresent(): Promise<void> {
    await acceptPrivacyConsentIfPresent(this.page);
  }

  async clickPlayOnline(): Promise<void> {
    await this.page.locator(`a[href="${playPageData.online.path}"]`).click();
  }

  async expectOnlineBoardLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(playPageData.online.path));
    await expect(this.page).toHaveTitle(playPageData.online.title);
    await expect(this.page.locator('.board')).toBeVisible();
  }

  async clickPlayBots(): Promise<void> {
    await this.page.locator(`a[href="${playPageData.bots.path}"]`).click();
  }

  async expectPlayBotsPopupVisible(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(playPageData.bots.path));
    await expect(
      this.page.getByRole('dialog').filter({ hasText: playPageData.bots.dialogTitle })
    ).toBeVisible();
  }

  async clickPlayCoach(): Promise<void> {
    await this.page.locator(`a[href="${playPageData.coach.path}"]`).click();
  }

  async expectPlayCoachPopupVisible(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(playPageData.coach.path));
    await expect(
      this.page.getByRole('dialog').filter({ hasText: playPageData.coach.dialogTitle })
    ).toBeVisible();
  }
}
