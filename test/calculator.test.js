import { test, expect } from '@playwright/test';

let context;

let cleanup = async (page) => {
  await page.close();
};

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
});

test.afterAll(async ({ browser }) => {
  await browser.close();
});

test('multiplication results are correct', async() => {
  let page = await context.newPage();

  await page.goto('http://localhost:3000/calculator');

  await page.getByText('2').click();
  await page.getByText('x').click();
  await page.getByText('6').click();
  await page.getByText('=').click();

  const result = page.locator('.component-display div');

  await expect(result, 'result of 2 mlutiplied by 6 is 12').toHaveText('12');

  await cleanup(page);
});

// TODO: result can be cleared


// TODO: confirm operator buttons are orange

