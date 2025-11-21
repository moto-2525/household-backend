import { test, expect } from "@playwright/test";

test("一覧が表示される", async ({ page }) => {
  // フロントのURLにアクセス
  await page.goto("http://localhost:3000");

  // テーブルの「ID」ヘッダーが見えることを確認
  await expect(page.getByRole("columnheader", { name: "ID" })).toBeVisible();

  const rows = page.locator("table tbody tr"); //画面上のtableのtbodyのtrを全部探す→ “一覧テーブルの行（レコード）全部”を指すLocatorを取得

  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThan(0);
});
