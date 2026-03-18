import { type Page } from '@playwright/test';

export async function acceptPrivacyConsentIfPresent(page: Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: 'I Accept' });

  if (await acceptButton.isVisible({ timeout: 1500 }).catch(() => false)) {
    await acceptButton.click();
  }
}
