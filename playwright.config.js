// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path')
/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 4000 * 1000, // 4000 seconds

  // Run tests in files sequentially
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Run with 1 worker on CI
  workers: process.env.CI ? 4: undefined,

  // Reporter configuration
 reporter: [
    ['json', { outputFile: 'playwright-report.json' }],
    ['html']
  ],
  use: {
    // Collect trace only when retrying a failed test
    trace: 'on-first-retry',
    // baseURL: 'http://127.0.0.1:3000',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
  },

  // Projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Optional: Run a dev server before tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
