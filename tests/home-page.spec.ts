import { test, expect } from '@playwright/test';
import { initialProducts } from '../lib/data';

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
    
    // Check if we're on the products page
    await expect(page.getByTestId('products-page-title')).toBeVisible();
    await expect(page.getByTestId('products-page-title')).toHaveText('Products');
  });
  
  test('should navigate to inventory page when clicking Manage Inventory button', async ({ page }) => {
    // Click the Manage Inventory button
    await page.getByTestId('inventory-link').click();
    
    // Check if we're on the inventory page
    await expect(page.getByTestId('inventory-page-title')).toBeVisible();
    await expect(page.getByTestId('inventory-page-title')).toHaveText('Inventory Management');
  });
});