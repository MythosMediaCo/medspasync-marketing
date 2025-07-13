import { test, expect } from '@playwright/test';
import path from 'path';

// Use import.meta.url to resolve __dirname in ESM
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Reconciliation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.fill('[data-testid="email-input"]', 'test@medspasync.com');
    await page.fill('[data-testid="password-input"]', 'testpassword123');
    await page.click('[data-testid="login-button"]');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should navigate to reconciliation page', async ({ page }) => {
    // Navigate to reconciliation
    await page.click('[data-testid="nav-reconciliation"]');
    await expect(page).toHaveURL(/.*reconciliation/);
    await expect(page.locator('[data-testid="reconciliation-page"]')).toBeVisible();
  });

  test('should display file upload interface', async ({ page }) => {
    await page.goto('/reconciliation');
    
    // Verify upload interface is visible
    await expect(page.locator('[data-testid="file-upload-area"]')).toBeVisible();
    await expect(page.locator('[data-testid="upload-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="supported-formats"]')).toBeVisible();
  });

  test('should upload CSV file successfully', async ({ page }) => {
    await page.goto('/reconciliation');
    
    // Upload test CSV file
    const filePath = path.join(__dirname, '../fixtures/sample-transactions.csv');
    await page.setInputFiles('[data-testid="file-input"]', filePath);
    
    // Verify file is selected
    await expect(page.locator('[data-testid="file-name"]')).toContainText('sample-transactions.csv');
  });

  test('should process uploaded file and show progress', async ({ page }) => {
    await page.goto('/reconciliation');
    
    // Upload file
    const filePath = path.join(__dirname, '../fixtures/sample-transactions.csv');
    await page.setInputFiles('[data-testid="file-input"]', filePath);
    
    // Click process button
    await page.click('[data-testid="process-button"]');
    
    // Verify processing indicator
    await expect(page.locator('[data-testid="processing-indicator"]')).toBeVisible();
    
    // Wait for processing to complete
    await expect(page.locator('[data-testid="processing-complete"]')).toBeVisible({ timeout: 60000 });
  });

  test('should display reconciliation results', async ({ page }) => {
    await page.goto('/reconciliation');
    
    // Mock successful processing by navigating to results
    await page.goto('/reconciliation/results');
    
    // Verify results are displayed
    await expect(page.locator('[data-testid="results-summary"]')).toBeVisible();
    await expect(page.locator('[data-testid="matched-transactions"]')).toBeVisible();
    await expect(page.locator('[data-testid="unmatched-transactions"]')).toBeVisible();
    await expect(page.locator('[data-testid="accuracy-score"]')).toBeVisible();
  });

  test('should allow manual review of unmatched transactions', async ({ page }) => {
    await page.goto('/reconciliation/results');
    
    // Click on unmatched transactions section
    await page.click('[data-testid="unmatched-transactions"]');
    
    // Verify manual review interface
    await expect(page.locator('[data-testid="manual-review"]')).toBeVisible();
    await expect(page.locator('[data-testid="transaction-list"]')).toBeVisible();
  });

  test('should export results successfully', async ({ page }) => {
    await page.goto('/reconciliation/results');
    
    // Click export button
    await page.click('[data-testid="export-button"]');
    
    // Verify download dialog or success message
    await expect(page.locator('[data-testid="export-success"]')).toBeVisible();
  });

  test('should show error for invalid file format', async ({ page }) => {
    await page.goto('/reconciliation');
    
    // Upload invalid file
    const filePath = path.join(__dirname, '../fixtures/invalid-file.txt');
    await page.setInputFiles('[data-testid="file-input"]', filePath);
    
    // Verify error message
    await expect(page.locator('[data-testid="file-error"]')).toBeVisible();
  });
}); 