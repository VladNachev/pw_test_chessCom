import { expect, type Page } from '@playwright/test';
import { signUpPageData } from '../test-data/signUpPageData';

export class SignUpPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectSignUpFormLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(signUpPageData.title);
    await expect(
      this.page.getByRole('heading', {
        level: 1,
        name: signUpPageData.heading
      })
    ).toBeVisible();
  }
}
