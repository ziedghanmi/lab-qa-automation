import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('login-username');
    this.passwordInput = page.getByTestId('login-password');
    this.submitButton = page.getByTestId('login-submit');
    this.errorMessage = page.getByTestId('login-error');
  }

  async goto(): Promise<void> {
    // Chemin relatif (sans "/" en tête) : avec baseURL = ".../Lab.qa/", un
    // chemin commençant par "/" remplacerait tout le path et pointerait vers
    // la racine du domaine (404 GitHub Pages) au lieu de "/Lab.qa/#/login".
    await this.page.goto('./#/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
