# MiniCheckout

A fashion-inspired, single-page retail checkout demo built to demonstrate reliable cart behaviour and browser-based quality testing.

## Project overview

MiniCheckout contains two synthetic fashion products, a responsive storefront, a shopping cart, customer-name validation, and an order confirmation with a generated reference. It is a frontend-only demonstration: no real payment is collected and no backend or database is used.

### Product catalogue
| Product | ID | Fixed price |
|---|---|---:|
| Urban Everyday Sneakers | CF-001 | ₹2,499 |
| Classic Everyday Tote | CF-002 | ₹1,899 |

## Technology
- React
- Vite
- JavaScript
- CSS
- Playwright

## Requirements
- Node.js 18 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Run browser tests

Install the Playwright Chromium browser once:

```bash
npx playwright install chromium
```

Run the automated test suite:

```bash
npm run test:e2e
```

Open the HTML report:

```bash
npm run test:report
```

The Playwright configuration starts the Vite development server automatically when the tests run.

## Automated coverage

- **TC01:** Successful checkout displays one confirmation and an order reference.
- **TC02:** Blank customer name blocks checkout and preserves the cart.
- **TC03:** Increasing the sneaker quantity updates the exact order total.

Each test opens a fresh page at the start of execution. Playwright uses customer-facing locators and assertions rather than fixed delays.

## Manual testing

Follow `docs/TEST-PLAN.md` for the empty-cart and rapid double-click scenarios. Record only observed results in `docs/TEST-RESULTS.md`. Add verified defects to `docs/DEFECT-REPORT.md`.

## Project structure

```text
src/
  components/       Reusable storefront, cart, checkout and confirmation UI
  data/             Fixed synthetic product data
  hooks/             Cart state and calculations
  utils/             Currency formatting and order reference generation
  App.jsx            Main single-page application
  styles.css         Responsive visual design
public/images/       Locally bundled product illustrations
tests/               Playwright browser tests
docs/                Test plan, results and defect report
```

## Design notes

The visual direction uses a pale sky-blue canvas, white surfaces, burgundy accents and a fashion retail presentation. The project uses its own name and synthetic products; it is an independent demo and is not an official Fynd product or integration.

## Scope limitations

- No real payment processing.
- No account creation or authentication.
- No backend, database, inventory service or external API.
- The search field is a visual storefront element and is not wired to a search service.

## Deployment

The project can be deployed as a static Vite site on Vercel:
1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.

## License

Created as an educational hackathon project.
