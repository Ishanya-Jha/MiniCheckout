import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("TC01: successful checkout shows one confirmation and an order reference", async ({ page }) => {
  await page.getByRole("button", { name: "Add Urban Everyday Sneakers to cart" }).click();
  await page.getByRole("button", { name: "Open cart, 1 items" }).click();
  await page.getByRole("button", { name: /Proceed to checkout/ }).click();

  await page.getByLabel("Your name").fill("Alex Customer");
  await page.getByRole("button", { name: /Place order/ }).click();

  await expect(page.getByTestId("order-confirmation")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Thank you, Alex Customer." })).toBeVisible();
  await expect(page.getByTestId("order-reference")).toHaveText(/^MC-[A-Z0-9]+-[A-Z0-9]+$/);
  await expect(page.getByTestId("order-confirmation")).toHaveCount(1);
});

test("TC02: missing customer name blocks checkout and preserves the cart", async ({ page }) => {
  await page.getByRole("button", { name: "Add Urban Everyday Sneakers to cart" }).click();
  await page.getByRole("button", { name: "Open cart, 1 items" }).click();
  await page.getByRole("button", { name: /Proceed to checkout/ }).click();
  await page.getByRole("button", { name: /Place order/ }).click();

  await expect(page.getByRole("alert")).toHaveText("Please enter your name before placing the order.");
  await expect(page.getByTestId("order-confirmation")).toHaveCount(0);
  await expect(page.getByTestId("quantity-CF-001")).toHaveText("1");
  await expect(page.getByLabel("Your name")).toBeVisible();
});

test("TC03: changing quantity updates the exact order total", async ({ page }) => {
  await page.getByRole("button", { name: "Add Urban Everyday Sneakers to cart" }).click();
  await page.getByRole("button", { name: "Open cart, 1 items" }).click();

  await expect(page.getByTestId("order-total")).toContainText("₹2,499");
  await page.getByRole("button", { name: "Increase Urban Everyday Sneakers quantity" }).click();

  await expect(page.getByTestId("quantity-CF-001")).toHaveText("2");
  await expect(page.getByTestId("order-total")).toContainText("₹4,998");
});
