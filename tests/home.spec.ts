import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { PlayPage } from '../pages/PlayPage';
import { SignUpPage } from '../pages/SignUpPage';
import { invalidLoginData } from '../test-data/loginData';

test.describe('Chess.com home page', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let playPage: PlayPage;
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    playPage = new PlayPage(page);
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

  test('main CTA buttons are visible', async () => {
    await homePage.expectMainCtasVisible();
  });

  test('clicking on Play redirects to the Play page', async () => {
    await homePage.clickPlay();
    await playPage.expectUrlAndTitleLoaded();
  });

  test('logging in with incorrect credentials shows an incorrect password message', async () => {
    await homePage.clickLogIn();
    await loginPage.expectLoginFormLoaded();

    await loginPage.login(invalidLoginData.email, invalidLoginData.password);

    await loginPage.expectIncorrectPasswordError();
  });
});
