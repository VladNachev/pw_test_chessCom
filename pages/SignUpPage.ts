import { expect, type Page } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  private readonly expectedTitle = 'New Member Registration & Signup - Chess.com';

  constructor(page: Page) {
    this.page = page;
  }

  async expectSignUpFormLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(this.expectedTitle);
    await expect(
      this.page.getByRole('heading', {
        level: 1,
        name: 'Create Your Chess.com Account'
      })
    ).toBeVisible();
  }
}
