# MiniCheckout Test Plan

## 1. Objective

Verify the customer-facing checkout journey for a two-product fashion storefront, focusing on cart calculations, required customer input, successful order confirmation, and prevention of duplicate submissions.

## 2. Scope

### In Scope
- Add and remove the two fixed-price products.
- Increase and decrease product quantities.
- Verify product line totals and order total calculations.
- Validate empty-cart and blank customer-name scenarios.
- Verify cart contents remain available after validation errors.
- Verify successful order confirmation and order reference generation.
- Verify rapid repeated submission does not create duplicate confirmations.
- Verify storefront responsiveness and accessible labels for primary controls.

### Out of Scope
- Real payment processing or payment providers.
- User authentication and authorization.
- Backend APIs and databases.
- Inventory management integrations.
- Shipping integrations.
- External commerce services.

## 3. Test Environment

| Component | Configuration |
|---|---|
| Application | React + Vite |
| Language | JavaScript |
| Automation Tool | Playwright |
| Browser | Chromium |
| Environment | Local development |
| Local URL | http://127.0.0.1:5173 |
| Test Data | Synthetic products from `src/data/products.js` |

## 4. Fixed Test Data

| Product | Product ID | Unit Price |
|---|---|---:|
| Urban Everyday Sneakers | CF-001 | ₹2,499 |
| Classic Everyday Tote | CF-002 | ₹1,899 |

## 5. Automated Test Cases

| Test ID | Priority | Scenario | Expected Result |
|---|---|---|---|
| TC01 | High | Add a product and complete checkout with a customer name | One confirmation appears with the customer name and an order reference |
| TC02 | High | Submit checkout with the customer name blank | Validation error appears, no confirmation is created, and the cart remains intact |
| TC03 | High | Increase sneaker quantity from one to two | Quantity updates to 2 and the order total becomes exactly ₹4,998 |

### Test Isolation

Each automated test navigates to the storefront using Playwright's `beforeEach` hook to begin with a clean application page state.

## 6. Manual Test Cases

| Test ID | Priority | Test Steps | Expected Result |
|---|---|---|---|
| MT01 | High | Open the cart without adding a product and attempt to proceed to checkout | Empty-cart message appears and checkout cannot proceed |
| MT02 | High | Add a product, open checkout, enter a customer name, and rapidly click Place Order twice | Only one order confirmation and one order reference are displayed |

## 7. Test Execution and Evidence

Run the automated test suite using:

```bash
npm run test:e2e
```

Playwright generates an HTML report in `playwright-report/`. Failure screenshots and traces are saved in `test-results/` when configured and applicable.

Manual test outcomes are documented in `TEST-RESULTS.md`. Screenshots or screen recordings should be retained as evidence where available.

## 8. Entry and Exit Criteria

### Entry Criteria
- Project dependencies are installed.
- The application starts successfully in the local development environment.
- Test data is available.

### Exit Criteria
- All three mandatory automated test cases have been executed.
- Both manual test scenarios have been attempted and recorded.
- Any discovered defects have reproducible steps and supporting evidence.
- Scenarios without observed defects are recorded accurately.

## 9. Limitations

Testing is limited to the defined application scope and scenarios. No real transactions, payment processing, backend integrations, or production-scale load testing are performed.
