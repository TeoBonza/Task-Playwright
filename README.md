# Playwright – Final Task

4 BDD scenarios with Playwright:

| # | Scenario | File |
|---|----------|------|
| 1 | Type text inside an iframe editor | `tests/iframe.spec.js` |
| 2 | Switch from the iframe back to the main page | `tests/iframe.spec.js` |
| 3 | Download a file | `tests/fileTransfer.spec.js` |
| 4 | Upload a file | `tests/fileTransfer.spec.js` |

## Setup

```bash
npm install
npx playwright install
```

## Run

```bash
npm test                # all browsers (Chrome, Firefox, Safari), headless
npm run test:chrome     # only Chrome
npm run test:firefox    # only Firefox
npm run test:safari     # only Safari (WebKit)
npm run report          # open the HTML report
```

Configuration (`playwright.config.js`):
- `headless: true` – browsers run without a window
- `workers: 2` – tests run in parallel on 2 instances
- `retries: 2` – a failed test is re-run 2 times before being marked as failed
