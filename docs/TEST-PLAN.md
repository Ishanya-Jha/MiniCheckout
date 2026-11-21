# MiniCheckout Test Plan

## 1. Objective
Verify the customer-facing checkout journey for a two-product fashion storefront, focusing on cart calculations, required customer input, successful order confirmation, and prevention of duplicate submissions.

## 2. Scope
### In scope
- Add and remove the two fixed-price products.
- Increase and decrease product quantities.
- Verify line totals and order total.
- Validate an empty cart and a blank customer name.
- Verify customer input and cart contents remain available after validation.
- Verify successful order confirmation and unique reference.
- Verify rapid repeated submission does not create duplicate confirmations.
- Responsive storefront presentation and accessible labels for primary controls.

### Out of scope
- Real payments, payment providers, authentication, backend APIs, databases, inventory integrations, shipping integrations, and external commerce services.

## 3. Test environment
- Application: React + Vite
- Browser automation: Playwright
- Browser: Chromium (Desktop Chrome profile)
- Local URL: http://127.0.0.1:5173
- Test data: synthetic product catalogue in `src/data/products.js`

## 4. Fixed test data
| Product | Product ID | Unit price |
|---|---|---:|
| Urban Everyday Sneakers | CF-001 | ₹2,499 |
| Classic Everyday Tote | CF-002 | ₹1,899 |

## 5. Automated test cases
| ID | Priority | Scenario | Expected result |
|---|---|---|---|
| TC01 | High | Add a product and complete checkout with a customer name | One confirmation is displayed with customer name and an order reference |
| TC02 | High | Submit checkout with the customer name blank | Clear validation error is displayed; no order confirmation is created; cart remains intact |
| TC03 | High | Increase sneaker quantity from one to two | Quantity becomes 2 and order total becomes exactly ₹4,998 |

Each automated test navigates to the storefront in `beforeEach`, providing a clean page/application state.

## 6. Manual test cases
| ID | Priority | Steps | Expected result |
|---|---|---|---|
| MT01 | High | Open cart without adding a product; attempt to proceed to checkout | Empty-cart message is displayed and checkout is not opened |
| MT02 | High | Add a product, open checkout, enter a name, then rapidly click Place order twice | Exactly one order confirmation and one order reference are displayed |

## 7. Execution and evidence
Run `npm run test:e2e` to execute automated tests. Playwright writes an HTML report to `playwright-report/` and failure screenshots/traces to `test-results/` when applicable.

Record manual test outcomes in `TEST-RESULTS.md`. Attach screenshots or screen recordings for manual tests when available.

## 8. Entry and exit criteria
- Entry: dependencies installed and application starts locally.
- Exit: all three required automated tests have been executed; both manual scenarios have been attempted and recorded; any discovered defects have reproducible evidence or are explicitly recorded as not observed.
