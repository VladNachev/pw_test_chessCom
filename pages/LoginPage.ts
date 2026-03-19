import { expect, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly title = 'Login - Chess.com';
  private readonly pathPattern = /\/login(?:_and_go)?(?:\?|$)/;
  private readonly incorrectPasswordMessage = 'This password is incorrect';

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(this.title);
    await expect(this.page).toHaveURL(this.pathPattern);
    await expect(this.page.locator('#login-username')).toBeVisible();
    await expect(this.page.locator('#login-password')).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('#login-username').fill(username);
    await this.page.locator('#login-password').fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  async expectIncorrectPasswordError(): Promise<void> {
    await expect(
      this.page.locator('p.authentication-login-error').filter({
        hasText: this.incorrectPasswordMessage
      })
    ).toBeVisible({ timeout: 30000 });
  }
}
