// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Iframe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
  });

  test('Scenario 1: user can type text inside the iframe editor', async ({ page }) => {
    // Given the editor inside the iframe
    const editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');
    await expect(editor).toHaveText('Your content goes here.'); // wait until the editor is loaded

    // When the user replaces the text
    await editor.click();
    await editor.press('ControlOrMeta+A');
    await editor.pressSequentially('Hello Playwright');

    // Then the new text is shown in the editor
    await expect(editor).toHaveText('Hello Playwright');
  });

  test('Scenario 2: user can switch from the iframe back to the main page', async ({ page }) => {
    // Given the user typed text inside the iframe
    const editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');
    await expect(editor).toHaveText('Your content goes here.'); // wait until the editor is loaded
    await editor.click();
    await editor.press('ControlOrMeta+A');
    await editor.pressSequentially('Iframe text');

    // When the user goes back to the main page
    const heading = page.locator('h3');

    // Then elements outside the iframe are reachable
    await expect(heading).toHaveText('An iFrame containing the TinyMCE WYSIWYG Editor');
    await expect(page.getByRole('link', { name: 'Elemental Selenium' })).toBeVisible();

    // And the iframe still keeps the text
    await expect(editor).toHaveText('Iframe text');
  });
});
