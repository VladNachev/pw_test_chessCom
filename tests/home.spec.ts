import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';

test.describe('Chess.com home page', () => {
  let homePage: HomePage;
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpPage = new SignUpPage(page);
    await homePage.goto();
  });

  test('loads and shows the expected title', async () => {
    await homePage.expectTitle();
  });

  test('clicking on the sign up button opens the sign up page', async () => {
    await homePage.clickSignUp();

    await signUpPage.expectSignUpFormLoaded();
  });
});
