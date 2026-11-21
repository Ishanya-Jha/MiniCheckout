# MiniCheckout Test Results

## 1. Execution Summary

- **Execution Date:** 21 November 2026
- **Execution Time:** 9:23 PM
- **Application:** MiniCheckout
- **Testing Type:** Automated and Manual Testing
- **Automation Tool:** Playwright
- **Browser:** Chromium
- **Automated Execution Time:** 12.1 seconds

## 2. Environment

- **Operating System:** Windows
- **Browser:** Chromium
- **Application Framework:** React + Vite
- **Local Environment:** Development server
- **Test Data:** Synthetic product catalogue

## 3. Automated Test Results

| Test ID | Result | Evidence / Notes |
|---|---|---|
| TC01 | PASS | Successful checkout displayed customer name, order confirmation, and order reference |
| TC02 | PASS | Blank customer name triggered validation; no confirmation was created and cart contents were preserved |
| TC03 | PASS | Increasing sneaker quantity from 1 to 2 updated the order total from ₹2,499 to ₹4,998 |

### Automated Test Summary

- **Total Tests:** 3
- **Passed:** 3
- **Failed:** 0
- **Blocked:** 0
- **Execution Time:** 12.1 seconds

## 4. Manual Test Results

| Test ID | Result | Evidence / Notes |
|---|---|---|
| MT01 | PASS | Empty cart prevented checkout from proceeding |
| MT02 | PASS | Rapid repeated submission produced only one order confirmation |

Both manual scenarios were performed successfully in the local application.

## 5. Overall Summary

- **Automated Tests Passed:** 3
- **Automated Tests Failed:** 0
- **Manual Tests Passed:** 2
- **Defects Opened:** 0

### Overall Observations

All three mandatory automated test cases passed in the recorded Playwright execution. Both manual test scenarios also behaved as expected.

No reproducible defects were observed in the scenarios executed.

Testing was limited to the defined MiniCheckout functionality and does not establish that every possible application behavior is defect-free.

## 6. Evidence

Retain the following evidence with the project submission:

1. Playwright HTML report showing all three automated tests passed.
2. Screenshot of the successful checkout confirmation.
3. Screenshot of the customer-name validation message.
4. Screenshot showing the updated order total after quantity modification.
5. Screen recording or screenshot of the manual empty-cart and rapid double-click checks, if available.
