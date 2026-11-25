// @ts-check
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('File upload and download', () => {
  test('Scenario 3: user can download a file', async ({ page }) => {
    // Given the download page
    await page.goto('https://the-internet.herokuapp.com/download');

    // When the user clicks the first file in the list
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#content a[href^="download/"]').first().click();
    const download = await downloadPromise;

    // Then the file is saved on the local machine
    const filePath = path.join(__dirname, 'downloads', download.suggestedFilename());
    await download.saveAs(filePath);
    expect(fs.existsSync(filePath)).toBe(true);

    // Clean up the downloaded file
    fs.rmSync(filePath);
  });

  test('Scenario 4: user can upload a file', async ({ page }) => {
    // Given the upload page
    await page.goto('https://the-internet.herokuapp.com/upload');

    // When the user selects a file and clicks Upload
    await page.locator('#file-upload').setInputFiles(path.join(__dirname, 'fixtures', 'upload-sample.txt'));
    await page.locator('#file-submit').click();

    // Then a confirmation message is shown
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toHaveText('upload-sample.txt');
  });
});
