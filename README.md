# Playwright TypeScript starter for Chess.com

## Requirements

- Node.js 22+

## Install

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
npm test
```

## Project structure

- `pages/` page object models for Chess.com pages and flows
- `tests/` Playwright spec files grouped by feature/page
- `test-data/` reusable expected values, paths, titles, and labels
- `utils/` shared helpers such as URL builders and consent handling
- `playwright.config.ts` shared Playwright runtime configuration
- `tsconfig.json` TypeScript project configuration
