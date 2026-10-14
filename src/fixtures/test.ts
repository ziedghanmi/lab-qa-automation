import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutReviewPage } from '../pages/CheckoutReviewPage';
import { CheckoutPaymentPage } from '../pages/CheckoutPaymentPage';
import { CheckoutConfirmationPage } from '../pages/CheckoutConfirmationPage';
import { accounts, type Account } from './accounts';

type PageObjectFixtures = {
  loginPage: LoginPage;
  catalogPage: CatalogPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutReviewPage: CheckoutReviewPage;
  checkoutPaymentPage: CheckoutPaymentPage;
  checkoutConfirmationPage: CheckoutConfirmationPage;
};

type AuthFixtures = {
  /** Compte utilisé par `authenticatedPage`. Se surcharge avec `test.use({ account }).` */
  account: Account;
  /**
   * Page déjà authentifiée, sans repasser par le formulaire de connexion.
   * L'application stocke sa session dans le localStorage (`auth-storage`) ;
   * on l'y dépose avant le premier chargement de script, ce qui est fidèle
   * à l'état réel que produirait une connexion UI, en beaucoup plus rapide
   * et sans dépendre du délai du compte `tortue_du_web`. La connexion via
   * l'UI elle-même reste testée explicitement (cas 1, cas 2, investigation
   * du compte lent) avec la fixture `page` + `loginPage`.
   */
  authenticatedPage: Page;
};

export const test = base.extend<PageObjectFixtures & AuthFixtures>({
  account: [accounts.jeanDupont, { option: true }],

  authenticatedPage: async ({ page, account }, use) => {
    const authState = JSON.stringify({
      state: {
        username: account.username,
        role: account.expectedRole,
        isAuthenticated: true,
      },
      version: 0,
    });
    await page.addInitScript((state) => {
      window.localStorage.setItem('auth-storage', state);
    }, authState);
    await page.goto('./#/catalog');
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  checkoutReviewPage: async ({ page }, use) => {
    await use(new CheckoutReviewPage(page));
  },
  checkoutPaymentPage: async ({ page }, use) => {
    await use(new CheckoutPaymentPage(page));
  },
  checkoutConfirmationPage: async ({ page }, use) => {
    await use(new CheckoutConfirmationPage(page));
  },
});

export { expect };
