import { expect, type Page } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  private readonly title = 'New Member Registration & Signup - Chess.com';
  private readonly heading = 'Create Your Chess.com Account';

  constructor(page: Page) {
    this.page = page;
  }

  async expectSignUpFormLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(this.title);
    await expect(
      this.page.getByRole('heading', {
        level: 1,
        name: this.heading
      })
    ).toBeVisible();
  }
}
