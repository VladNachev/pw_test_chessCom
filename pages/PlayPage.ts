import { expect, type Page } from '@playwright/test';
import { acceptPrivacyConsentIfPresent } from '../utils/consentUtils';
import { buildChessUrl } from '../utils/urlUtils';

export class PlayPage {
  readonly page: Page;
  private readonly path = '/play';
  private readonly title = 'Play Chess Online for Free with Friends & Family - Chess.com';
  private readonly onlinePath = '/play/online';
  private readonly onlineTitle = 'Play Chess Online for FREE - 2 Player Chess - Chess.com';
  private readonly botsPath = '/play/computer';
  private readonly botsDialogTitle = 'Play the bots';
  private readonly coachPath = '/play/coach?source=play_root';
  private readonly coachDialogTitle = 'Play and Learn with Coach';

  constructor(page: Page) {
    this.page = page;
  }

  async expectUrlAndTitleLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(this.path));
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

  async clickPlayOnline(): Promise<void> {
    await this.page.locator(`a[href="${this.onlinePath}"]`).click();
  }

  async expectOnlineBoardLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(this.onlinePath));
    await expect(this.page).toHaveTitle(this.onlineTitle);
    await expect(this.page.locator('.board')).toBeVisible();
  }

  async clickPlayBots(): Promise<void> {
    await this.page.locator(`a[href="${this.botsPath}"]`).click();
  }

  async expectPlayBotsPopupVisible(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(this.botsPath));
    await expect(
      this.page.getByRole('dialog').filter({ hasText: this.botsDialogTitle })
    ).toBeVisible();
  }

  async clickPlayCoach(): Promise<void> {
    await this.page.locator(`a[href="${this.coachPath}"]`).click();
  }

  async expectPlayCoachPopupVisible(): Promise<void> {
    await expect(this.page).toHaveURL(buildChessUrl(this.coachPath));
    await expect(
      this.page.getByRole('dialog').filter({ hasText: this.coachDialogTitle })
    ).toBeVisible();
  }
}
