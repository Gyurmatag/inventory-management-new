import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://inventory-management-new-six.vercel.app/');
  });

  test('should display home page with correct title and description', async ({ page }) => {
    // Check if the main heading and description are displayed correctly
    await expect(page.getByTestId('main-heading')).toHaveText('Inventory Management System');
    await expect(page.getByTestId('main-description')).toHaveText('Track and manage your product inventory efficiently');
  });

  
  test('should navigate to product page when clicking View Products button', async ({ page }) => {
    // Click the View Products button
    await page.getByTestId('products-link').click();
    
    // Check if we're on the products pages
    await expect(page.getByTestId('products-page-title')).toBeVisible();
    await expect(page.getByTestId('products-page-title')).toHaveText('Products');
  });

  // Írjunk egy tesztet, amely megvizsgálja, hogyha elnavigálnuk az Inventory oldalra a Manage Inventory gomb segítségével,
  // akkor tényleg azon az oldalon vagyunk-e

  // Írjunk egy tesztet, amely azt vizsgálja, hogyha az Analytics oldalra navigálunk a View Analytics gomb segítségével,
  // akkor tényleg sikeres volt-e a navigáció

  // Futassuk le az újonnan készült teszteinket!

  // Hozzunk létre egy új teszt fájlt a tests mappában, amely a navigációs bar tesztelésére szolgál
  // Ebben a fájlban nézzük meg, hogy működnek-e a navigációk az összes oldalra
  // Nézzük meg a Profile gombot is. :)

  // Futassunk le az újonnan készült teszteinket!
});