import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173'

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get and click the sign in button
  await page.getByRole('link', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  await page.locator('[name=email]').fill('johndoe@test.com');
  await page.locator('[name=password]').fill('password')

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByText('Sign in successful')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

test('should allow user to register', async ({ page }) => {
  const testEmail = `testemail${Math.floor(Math.random() * 9000) + 1000}@test.com`
  
  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create an account!' }).click();
  await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible()

  await page.locator('[name=firstName]').fill('jane');
  await page.locator('[name=lastName]').fill('doe');
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill('password');
  await page.locator('[name=confirmPassword]').fill('password');

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('Registration successful!')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
})
