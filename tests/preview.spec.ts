import { test, expect } from "@playwright/test";
test("empty library, sample opt-in, navigation and gallery search", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "One book. A world of thoughts." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Explore sample library", exact: true })
    .click();
  await page.getByRole("button", { name: /The Myth of Sisyphus/ }).click();
  await expect(
    page.getByRole("heading", {
      name: "Perhaps clarity is a kind of courage.",
    }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Journal gallery" }).click();
  await page
    .getByRole("textbox", { name: "Search sample journals by book or author" })
    .fill("Woolf");
  await expect(
    page.getByRole("heading", { name: "A Room of One’s Own" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "The Myth of Sisyphus" }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("question preview is honest and theme switches", async ({ page }) => {
  await page.goto("/ask");
  await expect(
    page.getByRole("button", { name: "Preview answer layout" }),
  ).toBeDisabled();
  await page
    .getByLabel("What are you wondering about?")
    .fill("What does this mean?");
  await page.getByRole("button", { name: "Preview answer layout" }).click();
  await expect(
    page.getByText("ILLUSTRATIVE LAYOUT · NO AI REQUEST WAS SENT"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Dark appearance" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
