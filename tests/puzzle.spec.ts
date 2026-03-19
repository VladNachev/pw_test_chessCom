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

    test('clicking Solve Puzzles loads a rated puzzle board', async () => {
        await puzzlePage.startRatedPuzzle();

        await puzzlePage.expectRatedPuzzleBoardLoaded();
    });
});
