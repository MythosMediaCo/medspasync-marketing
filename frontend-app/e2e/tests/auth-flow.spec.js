import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login form on homepage', async ({ page }) => {
    // Verify login form is visible
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
  });

  test('should show validation errors for invalid login', async ({ page }) => {
    // Try to login with invalid credentials
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');

    // Verify error message is displayed
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Login with valid test credentials
    await page.fill('[data-testid="email-input"]', 'test@medspasync.com');
    await page.fill('[data-testid="password-input"]', 'testpassword123');
    await page.click('[data-testid="login-button"]');

    // Wait for authentication state change and navigation (allow up to 5 seconds)
    await page.waitForURL(/.*dashboard/, { timeout: 5000 });
    
    // Verify dashboard is visible
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible({ timeout: 5000 });
  });

  test('should redirect to login when accessing protected route without auth', async ({ page }) => {
    // Try to access protected route directly
    await page.goto('/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
  });

  test('should logout successfully', async ({ page }) => {
    // First login
    await page.fill('[data-testid="email-input"]', 'test@medspasync.com');
    await page.fill('[data-testid="password-input"]', 'testpassword123');
    await page.click('[data-testid="login-button"]');
    
    // Wait for login to complete and dashboard to be visible
    await page.waitForURL(/.*dashboard/, { timeout: 5000 });
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible({ timeout: 5000 });
    
    // Click logout
    await page.click('[data-testid="logout-button"]');
    
    // Wait for logout to complete and redirect to login
    await page.waitForURL(/.*login/, { timeout: 5000 });
  });
}); 