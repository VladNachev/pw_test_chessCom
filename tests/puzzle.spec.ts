import { test } from '@playwright/test';
import { PuzzlePage } from '../pages/PuzzlePage';

test.describe('Chess.com puzzle page', () => {
    let puzzlePage: PuzzlePage;

    test.beforeEach(async ({ page }) => {
        puzzlePage = new PuzzlePage(page);
        await puzzlePage.goto();
    });

    test('puzzle header is visible', async () => {
        await puzzlePage.expectPuzzleHeaderVisible();
    });
});