import { test, expect } from '@playwright/test';

test.describe('Analytics Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3002/');
    await page.fill('[data-testid="email-input"]', 'test@medspasync.com');
    await page.fill('[data-testid="password-input"]', 'testpassword123');
    await page.click('[data-testid="login-button"]');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should navigate to analytics dashboard', async ({ page }) => {
    // Navigate to analytics via direct URL first to test component rendering
    await page.goto('http://localhost:3002/analytics');
    await expect(page).toHaveURL(/.*analytics/);
    await expect(page.locator('[data-testid="analytics-dashboard"]')).toBeVisible();
    
    // Now test link navigation from dashboard
    await page.goto('http://localhost:3002/dashboard');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    
    // Try navigation link click
    await page.getByTestId('nav-analytics').click();
    await page.waitForTimeout(1000); // Wait briefly for navigation
    
    // Check if URL changed
    console.log('URL after click:', page.url());
    await expect(page).toHaveURL(/.*analytics/);
  });

  test('should display key metrics cards', async ({ page }) => {
    await page.goto('/analytics');
    
    // Verify key metrics are displayed
    await expect(page.locator('[data-testid="revenue-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="transactions-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="accuracy-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="savings-metric"]')).toBeVisible();
  });

  test('should display revenue chart', async ({ page }) => {
    await page.goto('/analytics');
    
    // Verify revenue chart is present
    await expect(page.locator('[data-testid="revenue-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="chart-container"]')).toBeVisible();
  });

  test('should display transaction volume chart', async ({ page }) => {
    await page.goto('/analytics');
    
    // Verify transaction volume chart
    await expect(page.locator('[data-testid="transaction-volume-chart"]')).toBeVisible();
  });

  test('should display accuracy trends chart', async ({ page }) => {
    await page.goto('/analytics');
    
    // Verify accuracy trends chart
    await expect(page.locator('[data-testid="accuracy-trends-chart"]')).toBeVisible();
  });

  test('should allow date range filtering', async ({ page }) => {
    await page.goto('/analytics');
    
    // Click on date range picker
    await page.click('[data-testid="date-range-picker"]');
    
    // Select a date range
    await page.click('[data-testid="date-range-30-days"]');
    
    // Verify charts update
    await expect(page.locator('[data-testid="chart-updated"]')).toBeVisible();
  });

  test('should display reconciliation performance metrics', async ({ page }) => {
    await page.goto('/analytics');
    
    // Verify performance metrics section
    await expect(page.locator('[data-testid="performance-metrics"]')).toBeVisible();
    await expect(page.locator('[data-testid="processing-time"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-rate"]')).toBeVisible();
  });

  test('should allow export of analytics data', async ({ page }) => {
    await page.goto('/analytics');
    
    // Click export button
    await page.click('[data-testid="export-analytics"]');
    
    // Verify export options
    await expect(page.locator('[data-testid="export-options"]')).toBeVisible();
  });

  test('should display anomaly detection alerts', async ({ page }) => {
    await page.goto('/analytics');
    
    // Verify anomaly alerts section
    await expect(page.locator('[data-testid="anomaly-alerts"]')).toBeVisible();
  });

  test('should allow drill-down into specific metrics', async ({ page }) => {
    await page.goto('/analytics');
    
    // Click on a metric card
    await page.click('[data-testid="revenue-metric"]');
    
    // Verify detailed view opens
    await expect(page.locator('[data-testid="metric-detail-view"]')).toBeVisible();
  });

  test('should display predictive analytics insights', async ({ page }) => {
    await page.goto('/analytics');
    
    // Verify predictive insights section
    await expect(page.locator('[data-testid="predictive-insights"]')).toBeVisible();
    await expect(page.locator('[data-testid="forecast-chart"]')).toBeVisible();
  });
}); 