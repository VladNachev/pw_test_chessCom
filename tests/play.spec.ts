import { test } from '@playwright/test';
import { PlayPage } from '../pages/PlayPage';

test.describe('Chess.com play page', () => {
  let playPage: PlayPage;

  test.beforeEach(async ({ page }) => {
    playPage = new PlayPage(page);
    await playPage.goto();
  });

  test('clicking Play Online loads the chess board', async () => {
    await playPage.clickPlayOnline();

    await playPage.expectOnlineBoardLoaded();
  });

  test('clicking Play Bots shows the bots popup', async () => {
    await playPage.clickPlayBots();

    await playPage.expectPlayBotsPopupVisible();
  });

  test('clicking Play Coach shows the coach popup', async () => {
    await playPage.clickPlayCoach();

    await playPage.expectPlayCoachPopupVisible();
  });
});
