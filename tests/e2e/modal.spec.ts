import { test, expect } from '@playwright/test';

/**
 * End-to-end tests for Dialogo modal functionality.
 * These tests verify that the modal works correctly in a real browser environment
 * and supports framework-agnostic content (DOM elements, strings, framework objects).
 */
test.describe('Dialogo Modal E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open modal when open button is clicked', async ({ page }) => {
    // Click the open modal button
    await page.click('[data-testid="open-modal"]');

    // Check that modal is visible
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();

    // Check that modal content is displayed
    await expect(page.locator('[data-testid="modal-content"]')).toBeVisible();
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    // Open modal first
    await page.click('[data-testid="open-modal"]');
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();

    // Close modal
    await page.click('[data-testid="close-modal"]');

    // Check that modal is hidden
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  });

  test('should close modal when backdrop is clicked', async ({ page }) => {
    // Open modal first
    await page.click('[data-testid="open-modal"]');
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();

    // Click on backdrop
    await page.click('[data-testid="modal-backdrop"]');

    // Check that modal is hidden
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  });

  test('should navigate to next step', async ({ page }) => {
    // Open modal
    await page.click('[data-testid="open-modal"]');

    // Click next button
    await page.click('[data-testid="next-step"]');

    // Check that we're on the second step
    await expect(page.locator('[data-testid="step-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-1"]')).not.toBeVisible();
  });

  test('should go back to previous step', async ({ page }) => {
    // Open modal and navigate to step 2
    await page.click('[data-testid="open-modal"]');
    await page.click('[data-testid="next-step"]');

    // Go back
    await page.click('[data-testid="back-step"]');

    // Check that we're back to step 1
    await expect(page.locator('[data-testid="step-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-2"]')).not.toBeVisible();
  });

  test('should close modal when going back from first step', async ({ page }) => {
    // Open modal
    await page.click('[data-testid="open-modal"]');

    // Try to go back from first step
    await page.click('[data-testid="back-step"]');

    // Modal should be closed
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  });

  test('should show back button only when there is history', async ({ page }) => {
    // Open modal - back button should not be visible initially
    await page.click('[data-testid="open-modal"]');
    await expect(page.locator('[data-testid="back-step"]')).not.toBeVisible();

    // Navigate to next step - back button should now be visible
    await page.click('[data-testid="next-step"]');
    await expect(page.locator('[data-testid="back-step"]')).toBeVisible();
  });

  test('should handle multiple navigation steps', async ({ page }) => {
    // Open modal and navigate through multiple steps
    await page.click('[data-testid="open-modal"]');
    await page.click('[data-testid="next-step"]');
    await page.click('[data-testid="next-step"]');

    // Should be on step 3
    await expect(page.locator('[data-testid="step-3"]')).toBeVisible();

    // Go back twice
    await page.click('[data-testid="back-step"]');
    await page.click('[data-testid="back-step"]');

    // Should be back to step 1
    await expect(page.locator('[data-testid="step-1"]')).toBeVisible();
  });

  test('should maintain modal state when hidden and shown', async ({ page }) => {
    // Open modal and navigate
    await page.click('[data-testid="open-modal"]');
    await page.click('[data-testid="next-step"]');

    // Hide modal
    await page.click('[data-testid="hide-modal"]');
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();

    // Show modal again
    await page.click('[data-testid="show-modal"]');
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();

    // Should still be on step 2
    await expect(page.locator('[data-testid="step-2"]')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Open modal
    await page.click('[data-testid="open-modal"]');

    // Press Escape to close modal
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
  });

  test('should focus trap within modal', async ({ page }) => {
    // Open modal
    await page.click('[data-testid="open-modal"]');

    // Focus should be trapped within modal
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="modal"]')).toBeFocused();
  });
}); 