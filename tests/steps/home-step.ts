import { Page } from '@playwright/test';
import { BaseStep } from '@tests-steps/BaseStep';
import { Home } from '@tests-pages/home-page';

export class HomeSteps extends BaseStep {
  readonly page: Page;

  public homePage: Home;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.homePage = new Home(page);
  }
}
